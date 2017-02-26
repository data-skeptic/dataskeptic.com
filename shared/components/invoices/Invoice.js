import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Loading from '../../Common/Components/Loading'
import Error from '../../Common/Components/Error'
import CreditCardForm2 from '../CreditCardForm2'

import {get_invoice} from '../../utils/redux_loader'

class Invoice extends Component {
	get_id(props) {
		if (props.location == undefined) {
			return undefined
		}
		if (props.location.query == undefined) {
			return undefined
		}
		if (props.location.query.id == undefined) {
			return undefined
		}
		return props.location.query.id
	}

	componentWillMount() {
		var dispatch = this.props.dispatch
		var id = this.get_id(this.props)
		get_invoice(dispatch, id)
	}

	render() {
		var id = this.get_id(this.props)
		if (id == undefined) {
			return <Error />
		}
		console.log(id)
		var oadmin = this.props.admin.toJS()
		var invoice = oadmin.invoice
		if (invoice == undefined) {
			return <Loading />
		}
		console.log(invoice)
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
