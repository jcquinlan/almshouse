import React from 'react';
import { connect } from 'react-redux';

import { addUserData } from '../actions';
import Auth from '../auth';

const LoginView = (props) => {
    const login = () => {
        Auth.login();
    }

    return (
        <div>
            Login View
            <button onClick={login}>Login</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {
            dispatch(addUserData(user));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user() {
            return state.user;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
