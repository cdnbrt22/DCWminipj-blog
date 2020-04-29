import React , { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import firebase from "../../firebase/config";
import '../form.css';
import Navbar from '../Navbar/Navbar'
import './bootstrap-social.css'
import './social.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routeRedirect, setRedirect] = useState (false);

    const login = async(e) => {
        e.preventDefault();
        
        let res = await firebase.login(email, password);
        if(res.hasOwnProperty("message")){
            console.log(res.message);
        }
        if(res.hasOwnProperty("user")){
            console.log(res.user);
            setRedirect(true);
        }
    }
    const Social = () => {
        firebase.googleLogin()
        .then(function (result) {
            // const googleProvider = new firebase.auth.GoogleAuthProvider();
            // return firebase.auth.signInWithPopup(googleProvider);
            console.log(result);
            console.log("Sucess Google Account");
            setRedirect(true);
        })
        .catch(function (err) {
            console.log(err);
            console.log("Failed");
        });
    }

    const Social2 = () => {
        firebase.facebookLogin()
        .then(function(res){
            console.log(res);
            console.log("Sucess Facebook Account");
            setRedirect(true)
        })
        .catch(function (err) {
            console.log(err);
            console.log("Failed");
        });
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    return(
        <React.Fragment>
             <Navbar />
             
            <form className="f" onSubmit={login}>
               
                <h1>Wellcom the traveler</h1>

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value) }/>

                <label htmlFor="password">Password: </label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />

                <br/><input type="submit" value="Login" className="bt" /><br/>
                
                
            </form>
            <br/>
                <h1>--------------- OR ---------------</h1>
            <br/>
            <div className="sc">
                <button type="button" class="btn btn-social btn-google" onClick={Social}>
                <span className="fa fa-google"/> Login with Google+</button>
            </div> 
            <br/>
                <h1>--------------- OR ---------------</h1>
            <br/>
            <div className="sc">
                <button type="button" class="btn btn-social btn-facebook" onClick={Social2}>
                <span className="fa fa-google"/> Login with Facebook</button>
            </div> 
                
        </React.Fragment>
    )

}

export default withRouter(Login);