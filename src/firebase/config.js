import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firebase-firestore"
import "firebase/firebase-storage"
import { fireEvent } from "@testing-library/react";


const config = {
    apiKey: "AIzaSyDEGZCTYoX0c6zHMSGVD-ppVcSCGkpFnKI",
    authDomain: "dcwminipj-blog.firebaseapp.com",
    databaseURL: "https://dcwminipj-blog.firebaseio.com",
    projectId: "dcwminipj-blog",
    storageBucket: "gs://dcwminipj-blog.appspot.com",
    messagingSenderId: "641010530067",
    appId: "1:641010530067:web:dd0bd4babacdf6aead4ce6"
}

class firebase{
    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.firestore = firebase.firestore();
    }
}

export default new firebase;