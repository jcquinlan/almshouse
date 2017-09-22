import { combineReducers } from 'redux'
import { UserReducer } from './user.js';
import { HousemateReducer } from './housemate.js';

export default combineReducers({
    user: UserReducer,
    housemate: HousemateReducer
});