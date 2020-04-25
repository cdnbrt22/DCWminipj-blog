import React, { useEffect, useState } from 'react';
import { Redirect, withRoute } from "react-router-dom";
import firebase from "../../firebase/config";


const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [routeRedirect, setRefirect] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    
    const addPost = async(e) => {
        e.prevantDefault();
                 
        let post = {
            title,
            content,
            cover: cover[0]
        }
        await firebase.createPost(port).then(() => {
            console.log("Pots create success!!!");
            setIsBusy(false);
            setRefirect(false);
            
        }),catch(err => {
            console.log(err);
            
        })
    }
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />
    }


    let createform;
    if(isBusy){ 
        createform = <div className="process">
                        <p>Request is being processed</p>
                        <div className="load">Loading...</div> 
                    </div>
    }else{
        createform = <form onSubmit={addPost}>
                        <p>Create a new post.</p>

                        <label htmlFor="title =">Post title</label>
                        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="content">Post content</label>
                        <input type="text" name="comtent" onChange={(e) => setContent(e.target.value)} />

                        <label htmlFor="cover" className="cover">Cover</label>
                        <input type="file" onChange={(e) => setCover(e.target.value)} />
                        
                        <input type="submit" value="submit" />
        </form>
        
    }

    return(
        <React.Fragment>
            <h1>Create a traveler's guide</h1>
            {createform}
        </React.Fragment>
    )
}

export default Create;