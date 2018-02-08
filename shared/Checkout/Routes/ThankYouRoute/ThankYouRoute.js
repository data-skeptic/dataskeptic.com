import React, {Component, PropTypes} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'
import {changePageTitle} from "../../../Layout/Actions/LayoutActions";
import {loadReceipt} from "../../Actions/CheckoutActions";
import Receipt from "../../Components/Receipt";

const getLocationId = (search) => {
	const params = search.replace('?', '').split("=")
	let query = !!params[1] ? params[1] : ''
	if (query) {
		query = decodeURIComponent(query)
	}

	return query
}

class ThankYouRoute extends Component {

	componentWillMount() {
		const id = getLocationId(this.props.location.search)
		if (isEmpty(this.props.receipt)) {
			this.props.dispatch(loadReceipt(id))
    }

    const {title} = ThankYouRoute.getPageMeta()
		this.props.dispatch(changePageTitle(title))
	}

	static getPageMeta() {
		return {
			title: `Payment complete | Data Skeptic`
		}
	}

	render() {
	  const {loaded, receipt} = this.props
    const id = getLocationId(this.props.location.search)

		return (
			<div className="thank-you">
        <h1>Thank you!</h1>
        <p>Payment Complete.</p>
        <img src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png" width="200" />

        {loaded && <Receipt {...receipt}/>}
			</div>
		)
	}
}

export default connect(
	(state) => ({
		error: state.checkout.get('error'),
		loaded: state.checkout.get('loaded'),
		processing: state.checkout.get('processing'),
		receipt: state.checkout.get('receipt').toJS(),
	})
)(ThankYouRoute);
