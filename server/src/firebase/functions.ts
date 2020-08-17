import db from './model';

export async function getDocuments(collection: string): Promise<string[]> {
    let documentList: string[] = [];
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

export async function getCollectionData(collection: string): Promise<object> {
    let data = {};
    await db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            Object.assign(data, doc.data());
        });
    });
    return data;
}
