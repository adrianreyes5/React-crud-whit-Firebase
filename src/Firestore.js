import firebase from 'firebase/app';
import 'firebase/firebase-firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBoYi51H7vQrNIC26yw6kjUPHOf-YXpftY",
    authDomain: "react-crud-and-chat.firebaseapp.com",
    projectId: "react-crud-and-chat",
});

let db = firebase.firestore();
// db.settings({timestampsInSnapshots: true});

export default db;