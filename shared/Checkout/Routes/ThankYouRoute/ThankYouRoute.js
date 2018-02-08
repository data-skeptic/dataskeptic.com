import React, {Component, PropTypes} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'
import {changePageTitle} from "../../../Layout/Actions/LayoutActions";
import {loadReceipt} from "../../Actions/CheckoutActions";
import Receipt from "../../Components/Receipt";

function getParameterByName(name, url) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class ThankYouRoute extends Component {

	componentWillMount() {
		const id = getParameterByName('num', this.props.location.pathname)
    if (isEmpty(id)) {
		  return this.props.history.push('/')
    }

		if (isEmpty(this.props.receipt)) {
			this.props.dispatch(loadReceipt(id))
    }

    const {title} = ThankYouRoute.getPageMeta()
		this.props.dispatch(changePageTitle(title))
	}

	static getPageMeta() {
		return {
			title: `Payment Complete | Data Skeptic`
		}
	}

	render() {
	  const {loaded, receipt} = this.props

		return (
			<div className="thank-you">
        <div>
          <h1>Thank you!</h1>
          <p>Payment Complete.</p>
          <img src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png" width="200" />
        </div>

        {loaded ? <Receipt {...receipt}/> : <span>Loading...</span> }
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
