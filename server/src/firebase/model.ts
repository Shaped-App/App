import admin from 'firebase-admin';
import { ROOT_DIR } from '../const';

console.log('***** Loading firestore database *****');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(ROOT_DIR + 'firebase_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shaped.firebaseio.com'
});

const db = admin.firestore();
console.log('Loaded.');
export default db;

export const QuestionCollection: admin.firestore.CollectionReference = db.collection("questions");
// export const col: admin.firestore.CollectionReference = db.collection("questions");
export const UserCollection: admin.firestore.CollectionReference = db.collection("users");

export type DocRef = admin.firestore.DocumentReference;
export type ColRef = admin.firestore.CollectionReference;

export function RecentAnswersCollectionForUser(uid: string): ColRef {
  return RecentAnswerCollection(UserCollection.doc(uid));
}
export function AnswerCollectionFromID(qid: string): ColRef {
  return AnswerCollection(QuestionCollection.doc(qid));
}
export function RecentAnswerCollection(uid: DocRef): ColRef {
  return uid.collection("recent-answers");
}
export function AnswerCollection(qid: DocRef): ColRef {
  return qid.collection("answers");
}

