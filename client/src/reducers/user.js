const defaultUser = {
    data: null,
    error: null,
    loading: false
}

export const UserReducer = (user = defaultUser, action) => {
    switch (action.type){
        case 'ADD_USER_DATA':
            return Object.assign({}, user, { data: UserDataReducer(user.data, action) });

        case 'ADD_USER_ERROR':
            return Object.assign({}, user, { error: UserErrorReducer(user.error, action) });

        case 'START_USER_LOADING':
            return Object.assign({}, user, { loading: UserLoadingReducer(user.loading, action) });

        case 'STOP_USER_LOADING':
            return Object.assign({}, user, { loading: UserLoadingReducer(user.loading, action) });

        default:
            return user;
    }
}

const UserDataReducer = (data = null, action) => {
    switch (action.type){
        case 'ADD_USER_DATA':
            return Object.assign({}, data, action.payload);
        
        case 'REMOVE_USER_DATA':
            return null;
        
        default:
            return data;
    }
}

const UserErrorReducer = (error = null, action) => {
    switch (action.type){
        case 'ADD_USER_ERROR':
            return action.payload;
        
        case 'REMOVE_USER_ERROR':
            return null;
        
        default:
            return error;
    }
}

const UserLoadingReducer = (loading = false, action) => {
    switch (action.type) {
        case 'START_USER_LOADING':
            return true;
        
        case 'STOP_USER_LOADING':
            return false;
        
        default:
            return loading;
    }
}