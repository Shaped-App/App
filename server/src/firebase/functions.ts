import admin from 'firebase-admin';
import { AID, APIAnswer, APIQuestion, APIUser, APIUserInfo, getProfileInfoOutDto, postResponseOutDto, QID, UIDToken, UID } from 'src/app.dtos';
import { FirebaseAnswer, FirebaseQuestion, FirebaseUser, FirestoreAnswerConverter, FirestoreQuestionConverter, FirestoreUserConverter } from './firebase_objects';
import { AnswerCollectionFromID, DocRef, QuestionCollection, UserCollection } from './model';


export async function getUIDFromTokenTest(token: UIDToken): Promise<UID> 
{
    // const abUID = "88JPgNMNl4ZLollyfoTyHoS9qjC3"
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
        //TODO: determine reasonable return value when token invalid
        // needs to be universal, since token used many
        return e;
    }
    // finally {
    //     console.log("cleanup");
    // }
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

export async function getAPIQuestionsFromIDs(token: UIDToken, questionIDs: Array<QID>): Promise<Array<APIQuestion>> {
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
        const userAnswered = await getUserAnswered(await getUIDFromToken(token), doc.qid);
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

export async function makeAnswer(creatorToken: UIDToken , question: QID, answerText: string): Promise<APIAnswer> {
    const creator: UID = await getUIDFromToken(creatorToken);
    // TODO: make sure question document exists
    // TODO: make "answer" collection not a special string
    // make answer document
    const newAnswerRef: DocRef = AnswerCollectionFromID(question).doc();
    const newAnswer = new FirebaseAnswer(answerText, admin.firestore.Timestamp.now(), creator)
    newAnswerRef.set(newAnswer);
    // return answer document in APIAnswer format
    return newAnswer.toAPIAnswer(question, newAnswerRef.id);
}

export async function makeQuestion(token: UIDToken, questionText: string): Promise<APIQuestion> {
    const newQuestionRef: DocRef = QuestionCollection.doc();
    const newData: FirebaseQuestion = new FirebaseQuestion(
        questionText,
        admin.firestore.Timestamp.now(),
        await getUIDFromToken(token),
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

export async function makeUser(token: UIDToken, info: APIUserInfo): Promise<APIUser> {
    const uid: UID = await getUIDFromToken(token);
    //? use UID from API token or make user UID on own?
    //      .doc(uid) means that incoming uid (from token) has to be new
    //      otherwise new data could overwrite existing user's data

    // const newUserRef: DocRef = UserCollection.doc();
    const newUserRef: DocRef = UserCollection.doc(uid);
    const newUser = new FirebaseUser(uid, info)
    //TODO: how to protect if uid collides?
    newUserRef.set(newUser.toFirestore());
    // return user document in APIUser format
    return newUser.toAPIUser();
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
        time: "timeType",
        "info": {
            uid: "",
            email: "",
            phone_number: 343,
            //TODO:
            // profile_pic: image_id,
            gender: "",
            first_name: "",
            full_name: "",
            birthday: "time",
            zipcode: 3,
            looking_for_friend: false,
            looking_for_relationship: false,
            mile_distance_low: 3,
            mile_distance_high: 6,
            age_low: 3,
            age_high: 3,
            about: "",
            bible_verse: "",
        }
    }
}
///     Helper functions     

export async function getUIDFromToken(token: UIDToken): Promise<UID> 
{
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
    // TODO: better error handling bad token, change UID promise?
    return "bad token, no uid"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//TODO: check if user answered question
//TODO: implement an array version of this
export async function getUserAnswered(userID: string, questionID: string): Promise<boolean> {
    return false;
}