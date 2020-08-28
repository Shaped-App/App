import admin from 'firebase-admin';
import { APIQuestion, APIAnswer } from 'src/app.dtos';

type QID = string;
//TODO: aid requires qid, make class instead?
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
  toFirestore: function (fireQuestion: FirebaseQuestion) {
    return {
      question: fireQuestion.question,
      created: fireQuestion.created,
      creator: fireQuestion.creator
    };
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentData): FirebaseQuestion {
    // const data = snapshot.data();
    return new FirebaseQuestion(snapshot.question, snapshot.created, snapshot.creator, snapshot.id);
  },
};

export class FirebaseAnswer {
  qid: QID;
  aid: AID;
  answer: string;
  created: Time;
  creator: UID;
  constructor(aid: AID, answer: string, created: Time, creator: UID) {
    this.aid = aid;
    this.answer = answer;
    this.created = created;
    this.creator = creator;
  }
  toAPIAnswer(): APIAnswer {
    const answer: APIAnswer = {
      qid: this.qid,
      aid: this.aid,
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
    return new FirebaseAnswer(snapshot.id, snapshot.answer, snapshot.created, snapshot.creator);
  },
};