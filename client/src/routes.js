import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import Auth from './auth';
import ProtectedRoute from './utility/ProtectedRoute';

import LoginView from './views/Login';
import HomeView from './views/HomeView';
import LandingView from './views/LandingView';
import LoadingView from './views/LoadingView';

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      Auth.handleAuthentication();
    }
  }

export const makeRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={LandingView} />
            <Route path="/login" render={(props) => {
                if(Auth.isAuthenticated()) return <Redirect to={{ pathname: '/home' }} />
                return <LoginView {...props}/> 
            }}/>

            <Route path="/login-callback" render={(props) => {
                handleAuthentication(props);
                return <LoadingView />
            }}/>

            <ProtectedRoute path="/home" component={HomeView} redirectPath='/login'/>
        </Switch>
    )
}