import admin from 'firebase-admin';
import { userInfo } from 'os';
import { APIQuestion, APIAnswer, APIUserInfo, APIUser } from 'src/app.dtos';

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
  toFirestore (fireQuestion: FirebaseQuestion): FirebaseFirestore.DocumentData{
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
  toFirestore (fireAnswer: FirebaseAnswer) : FirebaseFirestore.DocumentData {
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

export class FirebaseUser {
  // created: Time;
  uid: UID;
  info: APIUserInfo;
  about: string;
  bible_verse: string;

  constructor(uid: UID, info: APIUserInfo, about?: string, bible_verse?: string) {
      this.uid = uid;
      this.info = info;
      this.about = about || "";
      this.bible_verse = bible_verse || "";
  }
  toAPIUser() : APIUser {
    return {
      email: this.info.email,
      phone_number: this.info.phone_number,
      // profile_pic: this.info.profile_pic,
      gender: this.info.gender,
      first_name: this.info.first_name,
      full_name: this.info.full_name,
      birthday: this.info.birthday,
      zipcode: this.info.zipcode,
      looking_for_friend: this.info.looking_for_friend,
      looking_for_relationship: this.info.looking_for_relationship,
      mile_distance: this.info.mile_distance,
      age_low: this.info.age_low,
      age_high: this.info.age_high,
      about: this.about,
      bible_verse: this.bible_verse,
    }
  }
  toFirestore() : FirebaseFirestore.DocumentData {
    return this.toAPIUser();
  }
}

function parseFirebaseUser(snapshot: FirebaseFirestore.DocumentData): FirebaseUser {
  const uid = snapshot.data.uid;
  const info: APIUserInfo = {
    email: snapshot.data.email,
    phone_number: snapshot.data.phone_number,
    // profile_pic: snapshot.data.profile_pic,
    gender: snapshot.data.gender,
    first_name: snapshot.data.first_name,
    full_name: snapshot.data.full_name,
    birthday: snapshot.data.birthday,
    zipcode: snapshot.data.zipcode,
    looking_for_friend: snapshot.data.looking_for_friend,
    looking_for_relationship: snapshot.data.looking_for_relationship,
    mile_distance: snapshot.data.mile_distance,
    age_low: this.info.age_low,
    age_high: this.info.age_high,
  }
  const about = snapshot.data.about;
  const bible_verse = snapshot.data.bible_verse;
  return new FirebaseUser(uid, info, about, bible_verse);
}

export const FirestoreUserConverter: FirebaseFirestore.FirestoreDataConverter<FirebaseUser> = {
  toFirestore (fireUser: FirebaseUser) : FirebaseFirestore.DocumentData {
    return fireUser.toFirestore();
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentData): FirebaseUser {
    return parseFirebaseUser(snapshot);
  },
};