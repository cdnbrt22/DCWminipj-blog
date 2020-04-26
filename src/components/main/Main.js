import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "../../firebase/config";


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
            <header>
                <h1>Main</h1>
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