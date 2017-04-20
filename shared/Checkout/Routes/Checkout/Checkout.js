import React, { Component } from 'react'
import { connect } from 'react-redux'

import CartContainer from '../../../Cart/Containers/CartContainer';
import Error from '../../../Common/Components/Error';
import Loading from '../../../Common/Components/Loading';
import ThankYouPage from '../ThankYou/ThankYouPage';

import CheckoutFormContainer from '../../Containers/CheckoutFormContainer';

import {changePageTitle} from '../../../Layout/Actions/LayoutActions';

class Checkout extends Component {
	constructor(props) {
		super(props)
	}

    componentDidMount() {
        const {dispatch} = this.props;
        const {title} = Checkout.getPageMeta(this.props);
        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Checkout | Data Skeptic'
        }
    }

	onScriptLoaded() {
		console.log("onScriptLoaded")
	}

	onScriptError() {
		console.log("onScriptError")
	}

	render() {
		const ocart = this.props.cart.toJS();
		const cart_items = ocart.cart_items;
		const country_long = ocart.country_long;
		const address = ocart.address;
		const stripeLoading = ocart.stripeLoading;
		const stripeLoadingError = ocart.stripeLoadError;
		const paymentComplete = ocart.paymentComplete;

		if (stripeLoading) {
			return <div><Loading /></div>
		}
		if (stripeLoadingError) {
			return <Error />
		}
		if (paymentComplete) {
			return <ThankYouPage />
		}
		if (cart_items.length === 0) {
			return <CartContainer updateable={true} />
		}

		return (
			<div className="checkout-page">
				<div className="checkout-cart">
					<CartContainer updateable={true} />
				</div>
				<div className="checkout-form">
					<div className="inner">
						<h2>Checkout</h2>

						<CheckoutFormContainer />
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(Checkout)
