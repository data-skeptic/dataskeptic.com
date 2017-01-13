import React, { Component, PropTypes } from 'react'
import axios from "axios"
import { connect } from 'react-redux'

import SendEmail from './SendEmail'
import OpenOrders from './OpenOrders'

class Admin extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		var dispatch = this.props.dispatch
	    dispatch({type: "INIT_ORDERS", payload: {dispatch} })		
	}

	orderTshirt() {
		var dispatch = this.props.dispatch
	    dispatch({type: "PLACE_ORDER", payload: dispatch })		
	}

	formUpdate(e) {
		if (e != undefined) {
			var att = e.target.id
			var val = e.target.value
			var u = {}
			u[att] = val
		    this.props.dispatch({type: "UPDATE_ORDER", payload: u })		
		}
	}

	onSizeChange(e) {
		var size = e.target.value
		var u = {size}
	    this.props.dispatch({type: "UPDATE_ORDER", payload: u })		
	}

	render() {
		var oadmin = this.props.admin.toJS()
		var order = oadmin.order
		var step = order.step
		var errorMsg = order.errorMsg
		return (
			<div className="center">
				{step}
				{errorMsg}
				<h2>Admin</h2>
				<h3>Order processing</h3>
				<form>
					<table>
						<tbody>
							<tr>
								<td>Size:</td>
								<td>
									<select id="size" onChange={this.onSizeChange.bind(this)}>
										<option value=''>---[Choose]---</option>
										<option value='sml'>Small</option>
										<option value='med'>Medium</option>
										<option value='lrg'>Large</option>
										<option value='xlg'>X-Large</option>
										<option value='xxl'>XX-Large</option>
										<option value='xxxl'>3XL</option>
										<option value='xxxxl'>4XL</option>
										<option value='xxxxxl'>5XL</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>DesignID:</td>
								<td><input id="designId" value={order.designId} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Name:</td>
								<td><input id="customerName" value={ order.customerName} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Address1</td>
								<td><input id="address1" value={order.address1} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Address2</td>
								<td><input id="address2" value={order.address2} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>City</td>
								<td><input id="city" value={order.city} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>State</td>
								<td><input id="state" value={order.state} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Zipcode</td>
								<td><input id="zipcode" value={order.zipcode} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Country</td>
								<td><input id="country" value={order.country} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Quantity</td>
								<td><input id="quantity" value={order.quantity} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Color</td>
								<td><input id="color" value={order.color} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
						</tbody>
					</table>
				</form>
				<button className="btn" onClick={this.orderTshirt.bind(this)}>Order T-shirt</button>
				<div>{order.spError}</div>
				<h4>Verification</h4>
				<p><a href="https://scalablepress.com/manager/order#?page=1">scalablepress.com/manager/order</a></p>
				<h4>Mark Fulfilled in Stripe</h4>
				<OpenOrders />
				<h4>Verification</h4>
				<p><a href="https://dashboard.stripe.com/orders">dashboard.stripe.com/orders</a></p>
				<h4>Send Confirmation Email</h4>
				<SendEmail />
				<div className="clear" />
			</div>
		)
	}
}
export default connect(state => ({ admin: state.admin, products: state.products }))(Admin)
