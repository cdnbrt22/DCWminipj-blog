import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "../../firebase/config";
import './main.css'


const Main = () => {
    const [posts, setPosts] = useState([]);
    
    const getPosts = async() => { 
        let post = [];
        const postsArray = await firebase.getPosts().catch(err => {
            console.log(err);
            return err;
        });
        // New Knoledge #forEach=get many variables
        postsArray.forEach(doc => {
            post.push({id: doc.id, data: doc.data()});
        });
        setPosts(post);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        
        <React.Fragment>
            
            <header className="header">
                
                <img className="img" />
                {/* <h1>The traveler</h1> */}
                <h2>" แชร์การท่องเที่ยวด้วยตัวเองแบบไม่เหมือนใคร ไม่ต้องพึ่งทัวร์ เดินทางไม่ลำบากมาก แต่ก็ไม่หรูเกินไป "</h2>
            </header>
           
            <div className="posts">
                {posts.map(p => {
                    return(
                        <div className="post" key={p.id}>
                            <p>{p.data.title}</p>

                            <Link to={"post/" + p.id}>
                                <div style={{backgroundImage: "url(" + p.data.cover + ")" }} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
        
    )
}

export default Main;