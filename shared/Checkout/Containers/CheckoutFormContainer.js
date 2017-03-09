import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import CheckoutForm from '../Components/CheckoutForm';

import {checkout} from '../Actions/CheckoutActions';

import Loading from "../../Common/Components/Loading";

export class CheckoutFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        data.country = this.props.country;
        data.total = this.props.total;
        data.shipping = this.props.shipping;
        data.products = this.props.products;

        console.dir(JSON.stringify(data));
        this.props.checkout(data);
    }

    render() {
        const {success, error, processing} = this.props;

        return (
            <CheckoutForm onSubmit={this.handleSubmit} customSuccess={success} customError={error} customSubmitting={processing}/>
        );
    }
}

export default connect(
    (state) => ({
        error: state.checkout.getIn(['error']),
        success: state.checkout.getIn(['success']),
        processing: state.checkout.getIn(['processing']),
        country: state.cart.getIn(['country_short']) || 'us',
        shipping: state.cart.getIn(['shipping']),
        total: state.cart.getIn(['total']),
        products: state.cart.getIn(['cart_items'])
    }),
    (dispatch) => bindActionCreators({
        checkout
    }, dispatch)
)(CheckoutFormContainer);