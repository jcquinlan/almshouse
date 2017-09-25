import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Auth from './auth';
import { initialAxiosConfig } from './axios';
import SignInSignOutLink from './utility/SignInSignOutLink';
import { makeRoutes } from './routes';

class App extends Component {
  constructor() {
    super();
    initialAxiosConfig();
    Auth.searchForLogin();
  }

  componentWillMount() {
    // When entering the application, check
    // to see if the user already has their information
    // in localStorage
    Auth.searchForLogin();
  }

  render() {
    return (
      <div>
          <ul>
            <li><SignInSignOutLink /></li>
            <li><Link to="/home">Home</Link></li>
          </ul>

          { makeRoutes() }
      </div>
    );
  }
}

export default App;
