import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/firestore"



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

    async signin(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err =>{
            console.log(err);
        });
        return user;
    }

    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err =>{
            console.log(err);
        });
        return user;
    }

    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
        });
        return logout;
    }
}

export default new firebase;