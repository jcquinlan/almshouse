import React from 'react';
import Auth from '../auth';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, redirectPath, ...rest}) => (
    <Route {...rest} render={props => (
        Auth.isAuthenticated() ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: redirectPath,
            state: { from: props.location }
          }}/>
        )
      )}/>
)

export default ProtectedRoute;