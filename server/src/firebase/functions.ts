import db, { QuestionCollection } from './model';
import { FirebaseQuestion } from './firebase_objects'



export async function getDocuments(collection: string): Promise<string[]> {
    const documentList: string[] = [];
    await db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
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

export async function getQuestions(questionIDs: Array<string>): Promise<Array<FirebaseQuestion>> {
    console.log("qids", questionIDs);
    // const docList : Array<Question> = [];
    const docList = [];
    const doc = await QuestionCollection.orderBy("created").limit(10).get()
    doc.forEach(function (doc) {
        // const ques: Question = doc.data();
        // doc.exists ? docList.push(ques) : null;
        // doc.exists ? docList.push(new Question(doc.data())) : null;
        docList.push(doc.data())
    })
    return docList;
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

