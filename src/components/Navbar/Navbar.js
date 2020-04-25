import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
// import firebase from "../firebase/config";



const Navbar = (props) =>{

    const [userState, setuserState] = useState(null);

    const logout = () => {
        console.log("user is logged out");
    }

    let buttons;
        if(userState != null){
            buttons = (
                <React.Fragment>
                <li><button className="logout" onClick={logout}>logout</button></li>
                </React.Fragment>
            )
        }else{
            buttons = (
                <React.Fragment>
                    <li><Link to="/signin">SignIn</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </React.Fragment>
            )
        }

        return(
            <nav>
                <ul>
                    <li><Link to="/">The travelers</Link></li>
                </ul>
                <ui>
                    <li><Link to="/create">new post</Link></li>
                    {buttons}
                </ui>
            </nav>
        )
}

export default withRouter(Navbar);