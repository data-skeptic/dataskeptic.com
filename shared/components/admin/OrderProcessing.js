import React from "react"
import ReactDOM from "react-dom"
import querystring from 'querystring'
import { connect } from 'react-redux'

class OrderProcessing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fulfilled: false
		}
	}

	componentDidMount() {
		var dispatch = this.props.dispatch
	}
	
	onSizeChange(e) {
		var size = e.target.value
		var u = {size}
		this.props.dispatch({type: "UPDATE_ORDER", payload: u })		
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

	render() {
		var oadmin = this.props.admin.toJS()
		var order = oadmin.order
		if (order == undefined) {
			return <Loading />
		}
		return (
				<div>
					<h3>Order processing</h3>
					<form>
						<table className="cms-table">
							<thead>
								<tr>
									<th>Value</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
							<tr>
								<td>DesignID:</td>
								<td><input id="designId" value={order.designId} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
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
								<td>Name:</td>
								<td><input id="customerName" value={order.customerName} onChange={this.formUpdate.bind(this)} /></td>
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
							<tr>
								<td></td>
								<td><button className="btn2" onClick={this.orderTshirt.bind(this)}>Order T-shirt</button></td>
							</tr>
							</tbody>
						</table>
					</form>
					<div>{order.spError}</div>
				</div>
		)
	}
}
export default connect(state => ({}))(OrderProcessing)
/*



*/