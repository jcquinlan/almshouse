import auth0 from 'auth0-js';
import { configureAxiosDefaults } from '../axios';
import { store } from '../index';
import { addUserData, removeUserData } from '../actions';
import jwtDecode from 'jwt-decode';

class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'almshouse.auth0.com',
        clientID: 'KENtWWXJahMARvhh1XHt_XocZpa6HKzP',
        redirectUri: 'http://localhost:3000/login-callback',
        responseType: 'token id_token',
        scope: 'openid profile'
      });

    constructor(){
          this.login = this.login.bind(this);
          this.logout = this.logout.bind(this);
          this.handleAuthentication = this.handleAuthentication.bind(this);
          this.isAuthenticated = this.isAuthenticated.bind(this);
          this.getProfile = this.getProfile.bind(this);
    }

    login () {
        this.auth0.authorize();
    }

    searchForLogin() {
        if(this.isAuthenticated()) {
            const profile = jwtDecode(localStorage.getItem('id_token'));
            store.dispatch(addUserData(profile));
        }
    }
      
    handleAuthentication() {
        return this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                // Once we have our access token, make sure it's
                // automatically added to all outgoing web requests
                // for OAuth purposes.
                configureAxiosDefaults({ accessToken: authResult.accessToken });
                this.setSession(authResult);
                store.dispatch(addUserData(authResult.idTokenPayload));
            } else if (err) {
                console.log(err);
            }
        });
    }
    
    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }
    
    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        store.dispatch(removeUserData());
    }
    
    isAuthenticated() {
        const accessToken = localStorage.getItem('access_token');
        const idToken = localStorage.getItem('id_token');
        const expiresAt = localStorage.getItem('expires_at');

        if(!(accessToken && idToken && expiresAt)){
            return false;
        }

        return new Date().getTime() < expiresAt;
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('No access token found');
        }
        return accessToken;
      }

    getProfile(cb) {
        let accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
          if (profile) {
            this.userProfile = profile;
          }
          cb(err, profile);
        });
      }
}

const auth = new Auth();

export default auth;