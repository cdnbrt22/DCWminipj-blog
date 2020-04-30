import React , {useEffect, useState, useRef} from "react";
import { Redirect } from 'react-router';
import firebase from "../../firebase/config";
import './post.css'
import Navbar from '../Navbar/Navbar'


const Post = (props) => {
    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [post, setPost] = useState("");

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);

    const [postid, setPostId] = useState("");
    const [routeRedirect, setRedirect] = useState(false);  

    const getPost = async(postid) => {
        const post = await firebase.getPost(postid).catch(err => {
            console.log(err);
        });
        const postData = post.data();
        setPost(postData);

    }

    useEffect(() => {
        setTimer(true);
        setPostId(props.match.params.id);
        getPost(props.match.params.id);
        

        firebase.getUserState().then(user => {
            if(user){
                setUserState(true);
            }
        });

        setTimeout(() => setTimer(false), 1000);


    }, [props.match.params.id])
    
    
    let currentPost;
    let editButton;
    let deleteButton;

    const updateCurrentPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);
        const post = {
            id: postid,
            title: titleRef.current.value,
            content: contentRef.current.value,
            fileRef: fileRef.current.value
        }

        if(fileRef.current.files.length > 0){
            post["cover"] = fileRef.current.files[0];
            post["oldcover"] = post.fileref;
        }
      
        firebase.updatePost(postid, post).then(() => {
            console.log("post updated");
            setIsBusy(false);
            setRedirect(true);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const toggleEditMode = () => {
        setEditMode(!editMode);
        
        
    }
    const deleteCurrentPost = () => {
        firebase.deletePost(postid, post.fileref)
        .then(() => {
            console.log("image and post deleted");   
            setRedirect(true);         
        }).catch(err => {
            console.log(err);
        });
    }

    const redirect = routeRedirect;
    if(redirect){
        return<Redirect to="/" />;
    }
    

    let updateForm;
    if(editMode){
        deleteButton = <input type="submit" value="Delete Post" className="btd" onClick={(e) => deleteCurrentPost()} />
        
        if(isBusy){
            updateForm =  <div className="processing">
                            <p>Request is being processed</p>
                            <div className="loader">Loading...</div>
                          </div> 
        }else{
            updateForm = <React.Fragment>
                            
                            <form className="ed" onSubmit={updateCurrentPost} >
                            
                                <label htmlFor="title">Title: </label>
                                <input type="text" className="title" ref={titleRef} defaultValue={post.title} />    

                                <label htmlFor="content">Content: </label>
                                <textarea className="content" ref={contentRef} defaultValue={post.content} ></textarea> 

                                <label htmlFor="cover" className="cover">Image: </label>
                                <input type="file" ref={fileRef} /><br/>
                                <br/>
                                <input type="submit" value="Update Post" className="bt" />
                                <br/>
                                <br/>
                                {deleteButton}
                            </form>   
                            
                         
                         </React.Fragment>
        }
    }
    
    if(timer){
        currentPost = <div className="processing">
                      <p>LOADING...</p>
                      <div className="loader">LOADING...</div>
        </div>
    }
    else{
        if(userState){
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}>Edit Post</button>
        }
        currentPost = <div className="showimg">
                        <br/>
                        <img src={post.cover} />
                        <h4>{post.title}</h4>
                        <div>{post.content}</div>
                        <div>{post.file}</div>
                        <br/>
                        {editButton}
                        {updateForm}
        </div>
    }

    return(
        <React.Fragment>
            <Navbar />
            {currentPost}
        </React.Fragment>
    )
}

export default Post;