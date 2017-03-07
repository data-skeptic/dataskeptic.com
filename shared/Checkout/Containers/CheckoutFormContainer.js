import React, { Component } from 'react'
import { connect } from 'react-redux'

import CheckoutForm from '../Components/CheckoutForm';

export class CheckoutFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        // {
        //     "first_name":"name",
        //     "last_name":"last",
        //     "street_1":"street",
        //     "street_2":"apt",
        //     "city":"city",
        //     "state":"state",
        //     "zip":"123123",
        //     "email":"test@mail.com",
        //     "phone":"(310) 123 - 1231",
        //     "card_number":"4242 4242 4244 2422",
        //     "card_name":"123123",
        //     "card_month":"12",
        //     "card_year":"1990",
        //     "card_cvv":"123"
        // }

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