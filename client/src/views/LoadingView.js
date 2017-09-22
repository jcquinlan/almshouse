import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoadingView extends Component {
    render(){
        const { userData, housemateData } = this.props;

        // Once the user is signed in, and we become aware of this via Redux,
        // transition them to home.
        if(userData && housemateData) return <Redirect to={{ pathname: '/home' }} />

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
        housemateData: state.housemate.data,
        housemateError: state.housemate.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
