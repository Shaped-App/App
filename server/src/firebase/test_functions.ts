// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import admin from 'firebase-admin';
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { UID, UIDToken } from "src/app.dtos";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPL1zb2ieut_Zp_w_c7o71MJh2MQC4MZU",
  authDomain: "shaped.firebaseapp.com",
  databaseURL: "https://shaped.firebaseio.com",
  projectId: "shaped",
  storageBucket: "shaped.appspot.com",
  messagingSenderId: "101529000857",
  appId: "1:101529000857:web:d18f68e29e9b55e0d39108",
  measurementId: "G-M4NE5S3NGC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Generates a custom token for a specified user
// This is our fake authentication service 
// Lets use obtain tokens for use in the API
export async function getTokenFromUIDTest(uid: UID): Promise<UIDToken> {
    const customToken = await admin.auth().createCustomToken(uid);
    const user = await firebase.auth().signInWithCustomToken(customToken).catch(function (error) {
        const code = error.code;
        if(code == 'auth/invalid-custom-token') {
            console.log("bad token");
        }
        else
        {
            console.log("idk error");
            console.error(error);
            
        }
    })
    if(user)
        return await user.user.getIdToken();
    return "bad uid, no token";
}