import admin from 'firebase-admin';

type QID = string;
type AID = string;
type UID = string;
type Time = admin.firestore.Timestamp;

// Firebase question
export class FirebaseQuestion {
  // qid: QID;
  question: string;
  created: Time;
  creator: UID;
  constructor(question: string, created: Time, creator: UID) {
    this.question = question;
    this.created = created;
    this.creator = creator;
  }
}

export const questionConverter = {
  toFirestore: function (question: FirebaseQuestion) {
    return {
      question: question.question,
      created: question.created,
      creator: question.creator
    };
  },
  fromFirestore: function (snapshot: { data: (arg0: any) => any; }, options: any) {
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  }
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
