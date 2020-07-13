import { ROOT_DIR } from '../const'

console.log('***** Loading firestore database *****');
var admin = require('firebase-admin');

var serviceAccount = require(ROOT_DIR + 'firebase_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shaped.firebaseio.com'
});

var db = admin.firestore();
console.log('Loaded.');
export default db;
