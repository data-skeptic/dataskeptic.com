import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Loading from '../../../Common/Components/Loading'
import Error from '../../../Common/Components/Error'
import CreditCardForm2 from '../../Components/CreditCardForm2'

import {get_invoice} from '../../../utils/redux_loader'

class Invoice extends Component {
	get_id(props) {
		if (!props.location) { return undefined }
		if (!props.location.query) { return undefined }
		if (!props.location.query.id) { return undefined }

		return props.location.query.id
	}

	componentWillMount() {
		const dispatch = this.props.dispatch;
		const id = this.get_id(this.props);
		get_invoice(dispatch, id);
	}

	render() {
		const id = this.get_id(this.props);
		if (!id) {
			return <Error />
		}
		const oadmin = this.props.admin.toJS();
		const invoice = oadmin.invoice;
		if (!invoice) {
			return <Loading />
		}

		return (
			<div className="center">
				<h2>Data Skeptic Invoicing</h2>
				<div><b>Invoice id:</b> {invoice.id}</div>
				<div><b>Date:</b> {invoice.date}</div>
				<p></p>
				<div>{invoice.customer.name}</div>
				<div>{invoice.customer.contact.name}</div>
				<div>{invoice.customer.contact.email}</div>
				<p></p>
				<div className="row invoice-tbl-header">
					<div className="col-xs-12 col-sm-6">Name</div>
					<div className="col-xs-4 col-sm-2 invoice-header-c">Quantity</div>
					<div className="col-xs-4 col-sm-2 invoice-header-c">Unit Price</div>
					<div className="col-xs-4 col-sm-2 invoice-header-r">Total</div>
				</div>
				{
					invoice.items.map(function(item) {
						var total = item.quantity * item.uprice
						return (
							<div className="row">
								<div className="col-xs-12 col-sm-6 invoice-row-cell">{item.name}</div>
								<div className="col-xs-4 col-sm-2 invoice-row-cellc">{item.quantity}</div>
								<div className="col-xs-4 col-sm-2 invoice-row-cellc">{item.uprice}</div>
								<div className="col-xs-4 col-sm-2 invoice-row-cellr">{total}</div>
							</div>
						)
					})
				}
				<div className="row">
					<div className="col-xs-6 col-sm-10"></div>
					<div className="col-xs-6 col-sm-2 invoice-row-cellt">
						<p>{invoice.total}</p>
					</div>
				</div>

				<CreditCardForm2 invoice_id={id} total={invoice.total} />

				<div><p> &nbsp; </p></div>
				<div><p> &nbsp; </p></div>
				<div><p> &nbsp; </p></div>
			</div>
		)
	}
}

export default connect(state => ({ admin: state.admin }))(Invoice)
