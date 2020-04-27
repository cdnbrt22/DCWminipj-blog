import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"



const config = {
    apiKey: "AIzaSyC664Ku9bIONQwiZxOBq5AfGEk-UyIiVZk",
    authDomain: "dcw-minipj-blog.firebaseapp.com",
    databaseURL: "https://dcw-minipj-blog.firebaseio.com",
    projectId: "dcw-minipj-blog",
    storageBucket: "gs://dcw-minipj-blog.appspot.com/",
    messagingSenderId: "498925628654",
    appId: "1:498925628654:web:c6099fe874dca51a6b97ff"
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
        const downloadURL = await storageChild.getDownloadURL();
        const fileRef = postCover.ref.location.path;
 
        let newPost = {
            title: post.title,
            content: post.content,
            cover: downloadURL,
            fileref: fileRef
        }
 
        await firebase.firestore().collection("posts").add(newPost);
    }

    async getPosts(){
        return await firebase.firestore().collection("posts").get();
    }

    async getPost(postid){
        return await firebase.firestore().collection("posts").doc(postid).get();
    }

}
export default new Firebase();