import Auth from '../auth';

export const ADD_USER_DATA = 'ADD_USER_DATA';
export const addUserData = (user) => {
    return {
        type: ADD_USER_DATA,
        payload: user
    }
}

export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
export const removeUserData = () => {
    return {
        type: REMOVE_USER_DATA,
    }
}

export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const addUserError = (error) => {
    return {
        type: ADD_USER_ERROR,
        payload: error
    }
}

export const REMOVE_USER_ERROR = 'REMOVE_USER_ERROR';
export const removeUserError = () => {
    return {
        type: REMOVE_USER_ERROR,
    }
}

export const START_USER_LOADING = 'START_USER_LOADING';
export const startUserLoading = () => {
    return {
        type: START_USER_LOADING,
    }
}

export const STOP_USER_LOADING = 'STOP_USER_LOADING';
export const stopUserLoading = () => {
    return {
        type: STOP_USER_LOADING,
    }
}

export const getUserDetails = () => {
    return function(dispatch) {
        dispatch(startUserLoading());

        Auth.getProfile((err, profile) => {
            if(err) {
                dispatch(addUserError(err));
                dispatch(stopUserLoading());
            } else {
                dispatch(addUserData(profile));
                dispatch(stopUserLoading());
            }
        });
    }
}