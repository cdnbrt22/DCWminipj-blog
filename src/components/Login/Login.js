import React , { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import firebase from "../../firebase/config";
import '../form.css';
import Navbar from '../Navbar/Navbar'



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
                
                {/* <button className="bt" onClick={(e) => loginGoogle()}>GoogleLogin</button> */}
                
            </form>
        
            
            
        </React.Fragment>
    )

}

export default withRouter(Login);