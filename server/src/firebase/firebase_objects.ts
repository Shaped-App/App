import admin from 'firebase-admin';
//TODO: need separate interfaces for firebase vs rest api
// firebase interfaces for how the data is stored in firebase (input)
//  firebase model?
// api interfaces for how the data is sent as json (output)
//  api model?


  
type QID = string;
type AID = string;
type UID = string;
type Time = admin.firestore.FieldValue;

// Firebase question
export interface FirebaseQuestion {
  // qid: QID;
  question: string;
  createdTime: Time;
  creator: UID;
}
export interface FirebaseAnswer {
  // aid: AID;
  answer: string;
  createdTime: Time;
  creator: UID;
}
// API question
// export interface Question {
//   qid: string;
//   question: string;
//   createdTime: Number;
//   creator: string;
//   "user-answered": boolean;
// }

// namespace FirebaseObjects {

//   export interface Question {
//     qid: string;
//     question: string;
//     createdTime: admin.firestore.FieldValue;
//     creator: string;
//   }
// }
// namespace ApiObjects{
//   export interface Question {
//     qid: string;
//     question: string;
//     createdTime: Number;
//     creator: string;
//     "user-answered": boolean;
//   }
// }

// namespace firebase_objects {
    // export interface Question {
    //     qid: string;
    //     question: string;
    //     created: number;
    //     user_answered: boolean;
    //     creator: string;
    // }
// }
