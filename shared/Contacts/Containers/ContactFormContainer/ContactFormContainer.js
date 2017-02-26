import React, { Component } from 'react';

import ContactForm from '../../Components/ContactForm/ContactForm'

class ContactFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind();
    }

    handleSubmit(data) {
        console.dir(data);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <ContactForm onSubmit={this.handleSubmit}/>
        );
    }
}

export default ContactFormContainer;