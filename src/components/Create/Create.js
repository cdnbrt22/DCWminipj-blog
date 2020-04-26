import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import firebase from "../../firebase/config";


const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [routeRedirect, setRedirect] = useState(false); 
    const [isBusy, setIsBusy] = useState(false);
    
    const addPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        let post = {
            title, 
            content,
            cover: cover[0]
        }
        await firebase.createPost(post).then(() => {
            console.log("Post created successfully");
            setIsBusy(false);
            setRedirect(true);
        
        }).catch(err => {
            console.log(err);
            setIsBusy(false);
        
        })        
    }
    
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }


    let createForm;
    if(isBusy){
        createForm = <div className="processing">
                        <p>Request is being processed</p>
                        <div className="load">Loading...</div>
                    </div>   
    }else{
        createForm = <form onSubmit={addPost}>
                        <p>New post.</p>

                        <label htmlFor="title =">Post title: </label>
                        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="content">Post Content: </label>
                        <textarea type="text" name="comtent" onChange={(e) => setContent(e.target.value)} />

                        <label htmlFor="cover" className="cover">Cover</label>
                        <input type="file" onChange={(e) => setCover(e.target.value)} />
                        
                        <input type="submit" value="submit" />
        </form>
        
    }

    return(
        <React.Fragment>
            <h1>Create a traveler's guide</h1>
            {createForm}
        </React.Fragment>
    )
}

export default Create;