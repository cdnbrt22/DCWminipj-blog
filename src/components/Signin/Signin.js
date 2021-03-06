import React , { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import firebase from "../../firebase/config"
import Navbar from '../Navbar/Navbar'

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routeRedirect, setRedirect] = useState (false);

    const signin = async(e) => {
        e.preventDefault();
        let res = await firebase.signin(email, password);
        if(res.hasOwnProperty("message")){
            console.log(res.message);

        }
        if(res.hasOwnProperty("user")){
            console.log(res.user);
            setRedirect(true);
        }
    }

    const signInGoogle = () => {
        firebase.loginGoogle()
            .then(function (result) {
                console.log(result);
                console.log("Sucess Google Account ");
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
            <Navbar/>
            <form onSubmit={signin} className="f">  
                <h1>Create Account</h1>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} /><br/>

              <br/><input type="submit" value="Create Account" className="bt" />
              {/* <br/><button onClick={() => signInGoogle()} >Sign in with Google</button> */}
            </form>
        </React.Fragment>
    )
}

export default withRouter(Signin);