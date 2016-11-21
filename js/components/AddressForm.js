import React from 'react'
import ReactDOM from 'react-dom'

export default class AddressForm extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
		console.log("cdm")
		var focus = this.props.focus
		console.log(focus)
		if (focus != "") {
			ReactDOM.findDOMNode(this.refs[focus]).focus()
		}
	}
	render() {
		var props = this.props
		var focus = props.focus
		var focus_msg = props.focus_msg
		return (
			<div class="row address-form">
				<div class="col-xs-12 shipping-address-title">{props.title}</div>
				<div class="col-xs-12">{focus_msg}</div>
				<div class="col-xs-12 col-sm-2 address-label">First name:</div>
				<div class="col-xs-12 col-sm-4">
					<input autoFocus={true} type="text" class="address-input first_name" ref="first_name" onChange={props.onAddressChange} />
				</div>

				<div class="col-xs-12 col-sm-2 address-label">Last name:</div>
				<div class="col-xs-12 col-sm-4">
					<input type="text" class="address-input last_name" ref="last_name" onChange={props.onAddressChange} />
				</div>

				<div class="col-xs-12 col-sm-2 address-label">Street address 1:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input street_1" type="text" ref="street_1" onChange={props.onAddressChange} />
			    </div>

				<div class="col-xs-12 col-sm-2 address-label">Street address 2:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input street_2" type="text" ref="street_2" onChange={props.onAddressChange} />
			    </div>

				<div class="col-xs-12 col-sm-2 address-label">City / town:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input city" type="text" ref="city" onChange={props.onAddressChange} />
			    </div>

				<div class="col-xs-12 col-sm-2 address-label">State / province:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input state" type="text" ref="state" onChange={props.onAddressChange} />
			    </div>

				<div class="col-xs-12 col-sm-2 address-label">Country</div>
				<div class="col-xs-12 col-sm-10 address-label"><span class="checkout-country">{props.country}</span></div>

				<div class="col-xs-12 col-sm-2 address-label">Postal / zipcode:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input zip" type="text" ref="zip" onChange={props.onAddressChange} />
			    </div>

				<div class="col-xs-12 col-sm-2 address-label">Email:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input email" type="text" ref="email" onChange={props.onAddressChange} />
			    </div>
			    
				<div class="col-xs-12 col-sm-2 address-label">Phone:</div>
				<div class="col-xs-12 col-sm-10">
					<input class="address-input phone" type="text" ref="phone" onChange={props.onAddressChange} />
			    </div>
			</div>
		)
	}
}
