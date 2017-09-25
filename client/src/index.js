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

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App}/>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);

registerServiceWorker();
