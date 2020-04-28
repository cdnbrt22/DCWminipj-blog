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
                <li><Link to="/create">New Post</Link></li>
                <li><button className="logout" onClick={logout}>logout</button></li>
                </React.Fragment>
            )
        }else{
            buttons = (
                <React.Fragment>
                    <li><Link to="/signin">SignIn</Link></li>
                    <li><Link to="/login">LogIn</Link></li>
                </React.Fragment>
            )
        }

        return(
            <nav className="navbar">
                <ul>
                    <li><Link to="/">The taveler blog</Link></li>
                </ul>
                
                <ul>
                    <li><Link to="/">Home</Link></li>
                    
                    {buttons}
                </ul>
                

            </nav>
        )
}

export default withRouter(Navbar);