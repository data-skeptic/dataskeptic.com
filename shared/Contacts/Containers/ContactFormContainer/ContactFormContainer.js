import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {getEmail} from '../../../../shared/Emails/template';
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
        const msg = getEmail(data, 'contact');
        return axios
            .post(MAIL_SERVICE_URL, msg);
    }

    render() {
        return (
            <div>
            <ContactForm onSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(ContactFormContainer)