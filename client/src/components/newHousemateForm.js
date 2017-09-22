import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { addHousemateData, addHousemateError } from '../actions/housemateActions';
import HousemateController from '../controllers/HousemateController';
import AuthController from '../controllers/AuthController';

class NewHousemateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        }
    }

    handleChange(values) {}

    handleUpdate(form) {
        this.setState(form);
    }

    handleSubmit(values) {
        const { addHousemateData, addHousemateError } = this.props;

        HousemateController.createSelf(values)
            .then(this.handleSelfResponse.bind(this))
            .catch(this.handleSelfError.bind(this));
    }

    handleSelfResponse(res) {
        const { addHousemateError } = this.props;

        const housemate = res.data.payload;
        localStorage.setItem("housemate", JSON.stringify(housemate));
        addHousemateData(housemate);

        this.updateUserMetadata(housemate);
    }

    handleSelfError(error) {
        const { addHousemateError } = this.props;
        
        if(error.response) {
            addHousemateError(error.response.data.error);
        } else {
            addHousemateError('Request failed');
        }
    }

    updateUserMetadata(housemate) {
        const { userData } = this.props;

        console.log('starting metadata')

        AuthController.updateMetadata(userData.sub, 'housemate', housemate)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderHousemateError() {
        const { housemateError } = this.props;
        if(housemateError) return <p>{ housemateError }</p>
    }

    render() {
        const required = val => val && val.length;
        const validPhone = val => val && !!val.match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/);
        const validEmail = val => val && !!val.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return (
            <div>
                { this.renderHousemateError() }

                <LocalForm
                    onUpdate={(form) => this.handleUpdate(form)}
                    onChange={(values) => this.handleChange(values)}
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    <label>First Name</label>
                    <Control.text
                        model=".firstName"
                        validators={{
                            required,
                        }}
                    />

                    <label>Last Name</label>
                    <Control.text
                        model=".lastName"
                        validators={{
                            required,
                        }}
                    />

                    <label>Phone</label>    
                    <Control.text
                        model=".phone"
                        validators={{
                            required,
                            validPhone
                        }}
                    />
                    <Errors
                        className="errors"
                        model=".phone"
                        show="touched"
                        messages={{
                            required: 'Required',
                            validPhone: 'Must be a valid phone number.',
                        }}
                    />

                    <label>Email</label>
                    <Control.text
                        model=".email"
                        validators={{
                            required,
                            validEmail
                        }}
                    />
                    <Errors
                        className="errors"
                        model=".email"
                        show="touched"
                        messages={{
                            required: 'Required',
                            validEmail: 'Must be a valid email.',
                        }}
                    />

                    <button type="submit">Save</button>
                </LocalForm>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.data,
        housemateError: state.housemate.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addHousemate(housemate) {
            dispatch(addHousemateData(housemate));
        },

        addHousemateError(error) {
            dispatch(addHousemateError(error));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHousemateForm);