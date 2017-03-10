import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ContactForm from '../../Components/ContactForm/ContactForm'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class ContactFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({name, email, message}) {
        const MAIL_SERVICE_URL = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/contact";
        const error = '';
        const data = {name, email, msg: message, error};

        return axios
            .post(MAIL_SERVICE_URL, JSON.stringify(data))
    }

    render() {
        return (
            <ContactForm onSubmit={this.handleSubmit}/>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(ContactFormContainer)