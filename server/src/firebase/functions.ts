import admin from 'firebase-admin';
import { AID, APIQuestion, QID, UID, APIAnswer } from 'src/app.dtos';
import { FirebaseAnswer, FirebaseQuestion, FirestoreQuestionConverter, FirestoreAnswerConverter } from './firebase_objects';
import db, { AnswerCollectionFromID, DocRef, QuestionCollection } from './model';



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

export async function getFirebaseQuestionsFromIDs(questionIDs: Array<QID>): Promise<Array<FirebaseQuestion>> {
    const docList: FirebaseQuestion[] = [];
    const questionQuery = QuestionCollection.where(admin.firestore.FieldPath.documentId(), "in", questionIDs)
    const docs = await questionQuery.withConverter(FirestoreQuestionConverter).get()
    docs.forEach(async function (snapshot) {
        const question: FirebaseQuestion = snapshot.data();
        snapshot.exists ? docList.push(question) : null;
    })
    console.log("docList length: ", docList.length);
    return docList
}

export async function getAPIQuestionsFromIDs(questionIDs: Array<QID>): Promise<Array<APIQuestion>> {
    const docList: APIQuestion[] = [];
    const questionQuery = QuestionCollection.where(admin.firestore.FieldPath.documentId(), "in", questionIDs)
    const docs = await questionQuery.withConverter(FirestoreQuestionConverter).get()
    docs.forEach(async function (snapshot) {
        const data: FirebaseQuestion = snapshot.data();
        // data.qid = snapshot.id;
        // const question: APIQuestion = data.toAPIQuestion();
        const question: APIQuestion = data.toAPIQuestion(snapshot.id);
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

export async function getAnswersOfQuestion(questionID: QID, answerIDs: Array<AID>): Promise<Array<APIAnswer>> {
    // const answerRef: DocRef = AnswerCollectionFromID(questionID).doc(answerID);
    const answerQuery = AnswerCollectionFromID(questionID).where(admin.firestore.FieldPath.documentId(), "in", answerIDs)
    const answerData = await answerQuery.withConverter(FirestoreAnswerConverter).get()
    const answerList: APIAnswer[] = [];
    answerData.forEach(async function (snapshot) {
        const data: FirebaseAnswer = snapshot.data();
        const question: APIAnswer = data.toAPIAnswer(questionID, snapshot.id);
        snapshot.exists ? answerList.push(question) : null;
    })
    return answerList;
}

export async function makeAnswer(creator: UID, question: QID, answerText: string): Promise<APIAnswer> {
    // TODO: make sure question document exists
    // TODO: make "answer" collection not a special string
    // make answer document
    const newAnswerRef: DocRef = AnswerCollectionFromID(question).doc();
    const newAnswer = new FirebaseAnswer(answerText, admin.firestore.Timestamp.now(), creator)
    newAnswerRef.set(newAnswer);
    // return answer document in APIAnswer format
    return newAnswer.toAPIAnswer(question, newAnswerRef.id);
}

export async function makeQuestion(questionText: string): Promise<APIQuestion> {
    const newQuestionRef: DocRef = QuestionCollection.doc();
    const newData: FirebaseQuestion = new FirebaseQuestion(
        questionText,
        admin.firestore.Timestamp.now(),
        await authGetUser(),
    );
    newQuestionRef.set(newData);
    return newData.toAPIQuestion(newQuestionRef.id);
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