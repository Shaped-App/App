import admin from 'firebase-admin';
import { APIQuestion } from 'src/app.dtos';

type QID = string;
type AID = string;
type UID = string;
type Time = admin.firestore.Timestamp;

// Firebase question
export class FirebaseQuestion {
  question: string;
  created: Time;
  creator: UID;
  qid: QID; //TODO: maybe optional? since writing to firestore with id is weird
  constructor(question: string, created: Time, creator: UID, qid: QID) {
    this.question = question;
    this.created = created;
    this.creator = creator;
    this.qid = qid;
  }
  toAPIQuestion(): APIQuestion {
    const question: APIQuestion = {
      question: this.question,
      created: this.created.toDate().toISOString(),
      userAnswered: false,  //TODO: change to proper behavior
      creator: this.creator,
      qid: this.qid,
    }
    return question
  }
}

export const FirestoreQuestionConverter: FirebaseFirestore.FirestoreDataConverter<FirebaseQuestion> = {
  toFirestore: function (question: FirebaseQuestion) {
    return {
      question: question.question,
      created: question.created,
      creator: question.creator
    };
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentData): FirebaseQuestion {
    // const data = snapshot.data();
    return new FirebaseQuestion(snapshot.question, snapshot.created, snapshot.creator, snapshot.id);
  },
};

export class FirebaseAnswer {
  // aid: AID;
  answer: string;
  created: Time;
  creator: UID;
  constructor(answer: string, created: Time, creator: UID) {
    this.answer = answer;
    this.created = created;
    this.creator = creator;
  }
}
