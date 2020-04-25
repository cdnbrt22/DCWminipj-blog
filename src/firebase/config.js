import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"



const config = {
    apiKey: "AIzaSyDEGZCTYoX0c6zHMSGVD-ppVcSCGkpFnKI",
    authDomain: "dcwminipj-blog.firebaseapp.com",
    databaseURL: "https://dcwminipj-blog.firebaseio.com",
    projectId: "dcwminipj-blog",
    storageBucket: "gs://dcwminipj-blog.appspot.com",
    messagingSenderId: "641010530067",
    appId: "1:641010530067:web:dd0bd4babacdf6aead4ce6"
}

class Firebase{
    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.firestore = firebase.firestore();
    }

    async signin(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch( err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch( err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async logout(){
        await firebase.auth().signOut().catch( err => {
            console.log(err);
        });
    }

    async getUserState(){
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(resolve);
            });
        
    }

    async createPost(post){
        const storageRef = firebase.storage().ref();
        const storageChild = storageRef.child(post.cover.name);
        const postCover = await storageChild.put(post.cover);
        const dowloadUrl = await storageChild.getDownloadURL();
        const flieRef = postCover.ref.location.path;

        let newPost = {
            title: post.title,
            content: post.content,
            cover: dowloadUrl,
            flieref: flieRef
        }
        await firebase.firestore().collection("posts").add(newPost);
        
    }
}

export default new Firebase();