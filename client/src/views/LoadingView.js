import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoadingView extends Component {
    constructor(){
        super();
    }
    
    render(){
        const { userError, userData } = this.props;
        console.log(userData);

        // Once the user is signed in, and we become aware of this via Redux,
        // transition them to home.
        if(userData) return <Redirect to={{ pathname: '/home' }} />

        // If the user data isn't logged in yet, keep them here.
        return (
            <div>
                Signing You In... Please Wait.
                { this.props.userData && this.props.userData.nickname }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.data,
        userError: state.user.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
