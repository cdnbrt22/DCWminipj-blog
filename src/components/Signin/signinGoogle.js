import React from 'react';
import { withRouter  } from 'react-router-dom'
import firebase from "../../firebase/config"


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
    

    return(
        <button onClick={signInGoogle} ></button>
    )
}
export default withRouter(signInGoogle);