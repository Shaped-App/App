import admin from 'firebase-admin';
import { APIQuestion, UID } from 'src/app.dtos';
import { FirebaseQuestion, FirestoreQuestionConverter } from './firebase_objects';
import db, { QuestionCollection } from './model';



export async function getDocuments(collection: string): Promise<string[]> {
    const documentList: string[] = [];
    await db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            documentList.push(doc.id)
        });
    });
    return documentList;
}

export async function getDocumentData(collection: string, document: string): Promise<object> {
    return db.collection(collection).doc(document).get().then((doc) => {
        return doc.exists ? doc.data() : null;
    })
}

export async function getFirebaseQuestionsFromIDs(questionIDs: Array<string>): Promise<Array<FirebaseQuestion>> {
    const docList: FirebaseQuestion[] = [];
    const q = QuestionCollection.where(admin.firestore.FieldPath.documentId(), "in", questionIDs)
    const docs = await q.withConverter(FirestoreQuestionConverter).get()
    docs.forEach(async function (snapshot) {
        const question: FirebaseQuestion = snapshot.data();
        snapshot.exists ? docList.push(question) : null;
    })
    console.log("docList length: ", docList.length);
    return docList
}

export async function getAPIQuestionsFromIDs(questionIDs: Array<string>): Promise<Array<APIQuestion>> {
    const docList = [];
    const q = QuestionCollection.where(admin.firestore.FieldPath.documentId(), "in", questionIDs)
    const docs = await q.withConverter(FirestoreQuestionConverter).get()
    docs.forEach(async function (snapshot) {
        const data: FirebaseQuestion = snapshot.data();
        const question: APIQuestion = data.toAPIQuestion();
        snapshot.exists ? docList.push(question) : null;
    })
    // This loop just adds userAnswered
    for (let index = 0; index < docList.length; index++) {
        const doc = docList[index];
        const userAnswered = await getUserAnswered(await authGetUser(), doc.qid);
        doc.userAnswered = userAnswered
    }
    console.log("APIQuestions length: ", docList.length);
    return docList
}
///     Helper functions     
// TODO: actually get userid from firebase auth
//? needs async or not?
export async function authGetUser(): Promise<UID> {
    return "FDr6IxDIO3GDkZMJ8hPy"
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserAnswered(userID: string, questionID: string): Promise<boolean> {
    return false;
}
//TODO: this function works weirdly when documents have same fields
export async function getCollectionData(collection: string): Promise<object> {
    const data = {};
    await db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            Object.assign(data, doc.data());
        });
    });
    return data;
}

