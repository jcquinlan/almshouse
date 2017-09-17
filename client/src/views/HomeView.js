import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../actions';
import axios from 'axios';

class HomeView extends Component {
    constructor(){
        super();

        this.getPrivate = this.getPrivate.bind(this);
    }

    componentDidMount(){
        if(!this.props.userData) {
            this.props.getUserDetails();
        }
    }
    
    render(){
        const { userError, userData } = this.props;
        return (
            <div>
                { userError && this.renderUserErrors() }
                Home! - { userData ? this.renderUsername() : 'Anonymous' }
                <button onClick={this.getPrivate}>Get Private</button>
            </div>
        );
    }

    renderUserErrors() {
        const { userError } = this.props;
        return <p>{ userError.error }</p>
    }

    renderUsername() {
        const { userData } = this.props;
        return <span>{ userData.nickname }</span>
    }

    getPrivate(){
        axios.get('/private').then(res => {
            console.log(res);
        });
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.data,
        userError: state.user.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails() {
            dispatch(getUserDetails());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
