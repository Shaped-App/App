import { Injectable } from '@nestjs/common';
import * as Dtos from './app.dtos';
//TODO: move
import admin from 'firebase-admin';
import { FirebaseAnswer, FirebaseQuestion } from './firebase/firebase_objects';
// import { getCollectionData, getDocumentData, getDocumentIDs } from './firebase/functions';
import { getDocumentData, getDocuments } from './firebase/functions';
import { QuestionCollection, UserCollection } from './firebase/model';

type DocRef = admin.firestore.DocumentReference;
type ColRef = admin.firestore.CollectionReference;
import FieldValue = admin.firestore.FieldValue;
import { APIAnswer } from './app.dtos';
import { query } from 'express';

@Injectable()
export class TestService {
  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class BrowseService {
  async getBrowseQuestionList(body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    return { qids: [{ qid: "hello", question: "question", userAnswered: true, created: "today" }] };
  }

  async getBrowseQuestion(body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    const docList = [];
    // TODO: get by ids, not orderby
    // const docs = await QuestionCollection.where("id", "==", body.qids[0]).orderBy("created").limit(10).get()
    const q = QuestionCollection.where(admin.firestore.FieldPath.documentId(), "in", body.qids)
    const docs = await q.get()
    docs.forEach(async function (snapshot) {
      //TODO: data as FirebaseQuestion
      const data = snapshot.data();
      const qid = snapshot.id;
      const ts: admin.firestore.Timestamp = data.created;
      const question: Dtos.APIQuestion = {
        qid: qid,
        question: data.question,
        created: ts.toDate().toJSON(),
        userAnswered: false,
        creator: data.creator
      }
      snapshot.exists ? docList.push(question) : null;
      // snapshot.exists ? docList[snapshot.id] = snapshot.data() : null;
    })
    for (let index = 0; index < docList.length; index++) {
      const doc = docList[index];
      const userAnswered = await this.getUserAnswered(await this.authGetUser(), doc.qid);
      doc.userAnswered = userAnswered
    }
    console.log("docList length: ", docList.length);
    return {
      questions: docList
    }
  }

  async getBrowseAnswerList(body: Dtos.getAnswerListInDto): Promise<Dtos.getAnswerListOutDto> {
    return { aids: [{ qid: "hello", aid: "goodbye", answer: "wowee", created: "today" }] };
  }

  async getBrowseAnswer(body: Dtos.getAnswerInDto): Promise<Dtos.getAnswerOutDto> {
    const questionID: string = body.qid;
    const answerIDs: string[] = body.aids;
    // TODO: figure out if firebase can query by list of ids
    const answerFirebase: FirebaseAnswer = await this.getAnswer(questionID, answerIDs[0]);
    const ts: admin.firestore.Timestamp = answerFirebase.created;
    // TODO: use class conversion
    const answerResponse: APIAnswer[] = [{
      qid: questionID,
      aid: answerIDs[0],
      answer: answerFirebase.answer,
      created: ts.toDate().toJSON(),
      creator: answerFirebase.creator
    }]

    return {
      answers: answerResponse
    };
  }


  postBrowseResponse(body: Dtos.postResponseInDto): Dtos.postResponseOutDto {
    return { qid: "hello", aid: "goodbye", time: "today", responsesLeft: 5 };
  }

  getBrowseResponseLimit(body: Dtos.getResponseLimitInDto): Dtos.getResponseLimitOutDto {
    return { responsesLeft: 5 };
  }

  async makeQuestion(questionText: string): Promise<DocRef> {
    const newQuestionRef: DocRef = QuestionCollection.doc();
    const newData: FirebaseQuestion = {
      // qid: newQuestionRef.id,
      question: questionText,
      // created: FieldValue.serverTimestamp(),
      created: admin.firestore.Timestamp.now(),
      creator: "admin",
    };
    newQuestionRef.set(newData);
    return newQuestionRef;
  }

  ///     Helper functions     
  // TODO: actually get userid from firebase auth
  //? needs async or not?
  async authGetUser(): Promise<Dtos.UID> {
    return "FDr6IxDIO3GDkZMJ8hPy"
  }
  async getUserAnswered(userID: string, questionID: string): Promise<boolean> {
    return false;
  }

  // async postBrowseAnswer(userID: string, questionID: string, answerText: string, time: string) : Promise<DocRef> {
  async postBrowseAnswer(body: Dtos.postAnswerInDto): Promise<Dtos.postAnswerOutDto> {
    const userID: Dtos.UID = await this.authGetUser();
    const questionID: Dtos.QID = body.qid;
    const answerText: string = body.answer;

    //?  using client-submitted time or server made time?
    const time: Dtos.Time = body.time;

    const questionRef = QuestionCollection.doc(questionID);
    const userRef = UserCollection.doc(userID);
    // const answerResponse: APIAnswer = this.makeAnswer(userRef, questionRef, answerText)
    return {
      answer: await this.makeAnswer(userRef, questionRef, answerText)
    }
  }

  async makeAnswer(userRef: DocRef, questionRef: DocRef, answerText: string): Promise<APIAnswer> {
    // TODO: make sure question document exists
    // TODO: make "answer" collection not a special string
    // make answer document
    const newAnswerRef: DocRef = questionRef.collection("answers").doc();
    const newAnswerData: FirebaseAnswer = {
      answer: answerText,
      // created: FieldValue.serverTimestamp(),
      created: admin.firestore.Timestamp.now(),
      creator: userRef.path,
    }
    newAnswerRef.set(newAnswerData);
    // return answer document
    // TODO: type casting between APIAnswer and FirebaseAnswer
    const api: APIAnswer = {
      qid: questionRef.id,
      aid: newAnswerRef.id,
      answer: answerText,
      created: newAnswerData.created.toString(),
      creator: userRef.id
    }
    return api;
  }
  async getAnswer(questionID: Dtos.QID, answerID: Dtos.AID): Promise<FirebaseAnswer> {
    const questionRef = QuestionCollection.doc(questionID);
    const answerRef: DocRef = questionRef.collection("answers").doc(answerID);
    // const answerData: admin.firestore.DocumentData = answerRef.get();
    const answerData = answerRef.get();
    const answer = (await answerData).data()
    //! same typecast here
    const response: FirebaseAnswer = {
      answer: answer.answer,
      creator: answer.creator,
      created: answer.created,
    }
    return response;
  }
}
