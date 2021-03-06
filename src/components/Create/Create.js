import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import firebase from "../../firebase/config";
import Navbar from '../Navbar/Navbar';
import './create.css'


const Create = (props) => {
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
    
    useEffect(() => {
        firebase.getUserState().then(user => {
            if(!user){
                props.history.replace("/login");
            }
        })
    })
    
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }


    let createForm;
    if(isBusy){
        createForm = <div className="processing">
                        <p>Request is being processed</p>
                        <div className="loader">Loading...</div>
                    </div>   
    }else{
        createForm = <form onSubmit={addPost} className="c">
                        <h1>Share traveler guide</h1>
                        
                        <label htmlFor="title">Title: </label>
                        <input type="text" className="title" onChange={(e) => setTitle(e.target.value)} />
                        
                        <label htmlFor="content">Content: </label>
                        <textarea className="content"  onChange={(e) => setContent(e.target.value)}  ></textarea>
                    
                        <label htmlFor="cover" className="cover">Image</label>
                        <input type="file" onChange={(e) => setCover(e.target.files)} /><br/>

                        <br/><input type="submit" value="SUBMIT" className="bt" />
                    </form>

    }

    return(
        <React.Fragment>
            <Navbar/>
            <br/>{createForm}
        </React.Fragment>
    )
}

export default Create;