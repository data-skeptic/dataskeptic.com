import React, { Component } from 'react'
import { connect } from 'react-redux'

import CheckoutForm from '../Components/CheckoutForm';

export class CheckoutFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
    	console.dir(data);
     	debugger;
    }

    render() {
        return (
			<CheckoutForm onSubmit={this.handleSubmit}/>
        );
    }
}

export default CheckoutFormContainer;