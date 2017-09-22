import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import axios from 'axios';

import NewHousemateForm from '../components/newHousemateForm';

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
        const { userError, userData, housemateData } = this.props;
        
        return (
            <div>
                { userError && this.renderUserErrors() }
                { housemateData && housemateData.firstName }
                Home! - { userData ? this.renderUsername() : 'Anonymous' }
                { !housemateData && <NewHousemateForm /> }
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
        housemateData: state.housemate.data,
        housemateError: state.housemate.error,
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
