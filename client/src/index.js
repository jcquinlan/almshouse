import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import rootReducer from './reducers';

import Auth from './auth';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <Route path="/" render={() => {
                    // When entering the application, check
                    // to see if the user already has their information
                    // in localStorage
                    Auth.searchForLogin();
                    return <App />
                }} />
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);
registerServiceWorker();
