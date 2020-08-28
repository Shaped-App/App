import { Injectable } from '@nestjs/common';
//TODO: move
import admin from 'firebase-admin';
import * as Dtos from './app.dtos';
import { APIAnswer } from './app.dtos';
import { FirebaseAnswer, FirebaseQuestion } from './firebase/firebase_objects';
import { authGetUser, getAPIQuestionsFromIDs, getAnswerOfQuestion } from './firebase/functions';
import { DocRef, QuestionCollection, UserCollection, AnswerCollection } from './firebase/model';


@Injectable()
export class TestService {
  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class BrowseService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBrowseQIDsFromTime(time: Dtos.Time) : Promise<Array<Dtos.QID>> {
    // const qids = await QuestionCollection.orderBy("created").limit(10).get()
    return ["aGixGhyA1S5LZYyXXCcE", "7ahZDKrDfQEhDZO5Br9R"]
  }
  async getBrowseQuestionList(body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    const qids = await this.getBrowseQIDsFromTime(body.time)
    return {
      qids: await getAPIQuestionsFromIDs(qids)
    }
  }

  async getBrowseQuestion(body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    return {
      questions: await getAPIQuestionsFromIDs(body.qids)
    }
  }

  async getBrowseAnswerList(body: Dtos.getAnswerListInDto): Promise<Dtos.getAnswerListOutDto> {
    return { aids: [{ qid: "hello", aid: "goodbye", answer: "wowee", created: "today" }] };
  }

  async getBrowseAnswer(body: Dtos.getAnswerInDto): Promise<Dtos.getAnswerOutDto> {
    const questionID: string = body.qid;
    const answerIDs: string[] = body.aids;
    // TODO: figure out if firebase can query by list of ids
    const answerFirebase: FirebaseAnswer = await getAnswerOfQuestion(questionID, answerIDs[0]);
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
    const newData: FirebaseQuestion = new FirebaseQuestion( 
      questionText,
      // created: FieldValue.serverTimestamp(),
      admin.firestore.Timestamp.now(),
      await authGetUser(),
      newQuestionRef.id,
      );
    newQuestionRef.set(newData);
    return newQuestionRef;
  }


  // async postBrowseAnswer(userID: string, questionID: string, answerText: string, time: string) : Promise<DocRef> {
  async postBrowseAnswer(body: Dtos.postAnswerInDto): Promise<Dtos.postAnswerOutDto> {
    const userID: Dtos.UID = await authGetUser();
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
    const newAnswerRef: DocRef = AnswerCollection(questionRef).doc();
    const newAnswer = new FirebaseAnswer(newAnswerRef.id, answerText, admin.firestore.Timestamp.now(), userRef.path)
    newAnswerRef.set(newAnswer);
    // return answer document in APIAnswer format
    return newAnswer.toAPIAnswer();
  }
}
