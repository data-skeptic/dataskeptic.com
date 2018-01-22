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
        const MAIL_SERVICE_URL = "api/v1/mail";
        const error = '';
        const data = {name, email, msg: message, error, type: "contact"};
        return axios.post(MAIL_SERVICE_URL, data);
    }

    render() {
        const { ...rest } = this.props
        return <ContactForm onSubmit={this.handleSubmit} {...rest}/>
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(ContactFormContainer)