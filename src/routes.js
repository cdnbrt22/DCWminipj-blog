import React from 'react';
import { Switch, Route } from "react-router-dom";
import Main from './components/main/Main';
import Signin from './components/Signin/Signin'
import Login from './components/Login/Login'
import Create from './components/Create/Create'
import Post from './components/Post/Post';

const Routes = () => (
    <Switch>
        <Route exact path="/" component = {Main} />
        <Route exact path="/signin" component = {Signin} />
        <Route exact path="/signup" component = {Login} />
        <Route exact path="/create" component = {Create} />
        <Route exact path="/post/:id" component = {Post} />
    </Switch>
)

export default Routes;