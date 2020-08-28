import admin from 'firebase-admin';
import { APIQuestion, APIAnswer } from 'src/app.dtos';

type QID = string;
//TODO: aid requires qid, make class instead?
type AID = string;
type UID = string;
type Time = admin.firestore.Timestamp;

// Firebase question
export class FirebaseQuestion {
  // qid: QID; //TODO: maybe optional? since writing to firestore with id is weird
  question: string;
  created: Time;
  creator: UID;
  // constructor(qid: QID, question: string, created: Time, creator: UID) {
  constructor(question: string, created: Time, creator: UID) {
    // this.qid = qid;
    this.question = question;
    this.created = created;
    this.creator = creator;
  }
  toAPIQuestion(qid: QID): APIQuestion {
    const question: APIQuestion = {
      // qid: this.qid,
      qid: qid,
      question: this.question,
      created: this.created.toDate().toISOString(),
      userAnswered: false,  //TODO: change to proper behavior
      creator: this.creator,
    }
    return question
  }
}

export const FirestoreQuestionConverter: FirebaseFirestore.FirestoreDataConverter<FirebaseQuestion> = {
  toFirestore: function (fireQuestion: FirebaseQuestion) {
    return {
      question: fireQuestion.question,
      created: fireQuestion.created,
      creator: fireQuestion.creator
    };
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentData): FirebaseQuestion {
    console.log("stuff: ", snapshot);
    const data = snapshot;
    return new FirebaseQuestion(data.question, data.created, data.creator);
  },
};

export class FirebaseAnswer {
  // qid: QID;
  // aid: AID;
  answer: string;
  created: Time;
  creator: UID;
  constructor(answer: string, created: Time, creator: UID) {
    // this.aid = aid;
    this.answer = answer;
    this.created = created;
    this.creator = creator;
  }
  toAPIAnswer(qid: QID, aid: AID): APIAnswer {
    const answer: APIAnswer = {
      qid: qid,
      aid: aid,
      answer: this.answer,
      created: this.created.toDate().toISOString(),
      creator: this.creator
    }
    return answer
  }
}

export const FirestoreAnswerConverter: FirebaseFirestore.FirestoreDataConverter<FirebaseAnswer> = {
  toFirestore: function (fireAnswer: FirebaseAnswer) {
    return {
      answer: fireAnswer.answer,
      created: fireAnswer.created,
      creator: fireAnswer.creator
    };
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentData): FirebaseAnswer {
    return new FirebaseAnswer(snapshot.answer, snapshot.created, snapshot.creator);
  },
};