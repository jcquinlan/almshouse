import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth';
import history from '../history';

const SignInSignOutLink = (props) => {
  const signout = () => {
    Auth.logout();
    history.go('/login');
  }

  if(!Auth.isAuthenticated()) {
    return <Link to="/login">Login</Link>
  } else {
    return <p className="signout-link" onClick={signout}>Sign Out</p>
  }
}

export default SignInSignOutLink;