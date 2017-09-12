import { combineReducers } from 'redux'
import { UserReducer } from './user.js';

export default combineReducers({
    user: UserReducer
});