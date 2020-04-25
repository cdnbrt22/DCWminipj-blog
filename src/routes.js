import React from 'react';
import { Switch, Route } from "react-router-dom";
import Main from './components/Main/Main';
import Signin from './components/Signin/Signin'
import Login from './components/Login/Login'
import Create from './components/Create/Create'

const Routes = () => (
    <Switch>
        <Route exact path="/" component = {Main} />
        <Route exact path="/signin" component = {Signin} />
        <Route exact path="/login" component = {Login} />
        <Route exact path="/create" component = {Create} />
    </Switch>
)

export default Routes;