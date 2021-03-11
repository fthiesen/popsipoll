import firebase from 'firebase/app';
import 'firebase/database';

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD1TfKIjuziwL2S16k_0ZINFem6_qt9HWE",
    authDomain: "anonymous-poll-fefaf.firebaseapp.com",
    projectId: "anonymous-poll-fefaf",
    storageBucket: "anonymous-poll-fefaf.appspot.com",
    messagingSenderId: "493724375810",
    appId: "1:493724375810:web:eaabc65a8b686c8628801b"
    };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    export default firebase;
