import admin from 'firebase-admin';
import { AID, APIAnswer, APIQuestion, getProfileInfoOutDto, postResponseOutDto, QID, Token, UID } from 'src/app.dtos';
import { FirebaseAnswer, FirebaseQuestion, FirestoreAnswerConverter, FirestoreQuestionConverter, FirestoreUserConverter } from './firebase_objects';
import { AnswerCollectionFromID, DocRef, QuestionCollection, UserCollection } from './model';

export async function getUIDFromTokenTest(token: Token): Promise<UID> 
{
    const abUID = "88JPgNMNl4ZLollyfoTyHoS9qjC3"
    // try {
    //     const abToke = await admin.auth().createCustomToken(abUID);
    //     console.log("got abtoke");
    //     const decToke = admin.auth().verifyIdToken(abToke); 
    //     console.log("verify abtoke");
    //     console.log((await decToke).uid);
    // }
    // catch (e) {
    //     console.log("ab bad");
    //     console.log(e);
    // }
    try {
        console.log("token is");
        console.log(token);
        const goodToken = await admin.auth().verifyIdToken(token);
        const uid = goodToken.uid;
        console.log("from token got uid:", uid);
        return uid;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        console.log("cleanup");
    }
    return "bad token, no uid"
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

export async function postResponseToAnswer(qid: QID, aid: AID): Promise<postResponseOutDto> {
    return {
        qid: qid,
        aid: aid,
        time: admin.firestore.Timestamp.now().toDate().toISOString(),
        responsesLeft: 5
    };
}

export async function getUserInfoFromUID(UID: UID): Promise<getProfileInfoOutDto> {
    
    console.log("start");
    const userQuery = UserCollection
    console.log("saasdf");
    const doc = userQuery.doc(UID)
    console.log("end");
    const docs = await doc.withConverter(FirestoreUserConverter).get()
    
    console.log(docs);
    return {
      "info": {
        uid: "",
        email: "",
        phone_number: "",
        //TODO:
        // profile_pic: image_id,
        gender: "",
        first_name: "",
        full_name: "",
        birthday: "time",
        zipcode: 3,
        looking_for_friend: false,
        looking_for_relationship: false,
        mile_distance: 3,
        age_low: 3,
        age_high: 3,
        about: "",
        bible_verse: "",
      }
    }
}
///     Helper functions     
// TODO: actually get userid from firebase auth
// needs to get from token 
//? needs async or not?
export async function authGetUser(): Promise<UID> {
    return "FDr6IxDIO3GDkZMJ8hPy"
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserAnswered(userID: string, questionID: string): Promise<boolean> {
    return false;
}