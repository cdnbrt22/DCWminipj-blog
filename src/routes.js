import React from 'react';
import { Switch, Route } from "react-router-dom";
import Main from './components/Main/Main';
import Signin from './components/Signin/Signin'
import Login from './components/Login/Login'


const Routes = () => (
    <Switch>
        <Route exact path="/" component = {Main} />
        <Route exact path="/Signin" component = {Signin} />
        <Route exact path="/Login" component = {Login} />
    </Switch>
)

export default Routes;