import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase/config";
import './Navbar.css'


const Navbar = (props) =>{

    const [userState, setuserState] = useState(null);
    
   

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(user){
                setuserState(user);
            }
        })
    })
    const logout = () => {
        firebase.logout();
        setuserState(null);
        props.history.replace("/login");
    }

    let buttons;
        if(userState != null){
            buttons = (
                <React.Fragment>
                <li><Link to="/create" className="hover">New Post</Link></li>
                <li><Link to="/" className="hover" onClick={logout}>Logout</Link></li>
                </React.Fragment>
            )
        }else{
            buttons = (
                <React.Fragment>
                    <li><Link to="/signin" className="hover">SignIn</Link></li>
                    <li><Link to="/Signup" className="hover" >Sign up</Link></li>
                    
                </React.Fragment>
            )
        }

        return(
            
            <nav className="n">
                <ul>
                    <li><Link to="/" className="ttb">The taveler blog</Link></li>
                </ul>
                
                <ul>
                    <li><Link to="/" className="hover">Home</Link></li>
                    
                    {buttons}
                </ul>
                

            </nav>
        )
}

export default withRouter(Navbar);