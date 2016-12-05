import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import CountrySelector from './CountrySelector'

class AddressForm extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
		console.log("cdm")
		/*
		var focus = this.props.focus
		console.log(focus)
		if (focus != "") {
			ReactDOM.findDOMNode(this.refs[focus]).focus()
		}
		*/
	}

	onAddressChange(event) {
		var ocart = this.props.cart.toJS()
		console.log("ocart")
		console.log(ocart)
		var address = ocart.address
		console.log(address)
		//var target = event.target
		//var cls = target.className
		//cls = cls.replace("address-input ", "")
		//var val = target.value
		//console.log(address)
		//address[cls] = val
		//this.props.dispatch({type: "UPDATE_ADDRESS", payload: address })
	}

	render() {
		var ocart = this.props.cart.toJS()
		var focus = ocart.focus
		var focus_msg = ocart.focus_msg
		var title = this.props.title
		var abox = <div></div>
		if (focus_msg != "") {
			abox = <div className="col-xs-12 address-validation-msg">{focus_msg}</div>
		}
		return (
			<div className="address-form-container">
				<div className="row address-form">
					<div className="col-xs-12 shipping-address-title">{title}</div>
					{abox}
					<div className="col-xs-12 col-sm-2 address-label">First name:</div>
					<div className="col-xs-12 col-sm-4">
						<input autoFocus={true} type="text" className="address-input first_name" ref="first_name" onChange={this.onAddressChange.bind(this)} />
					</div>

					<div className="col-xs-12 col-sm-2 address-label">Last name:</div>
					<div className="col-xs-12 col-sm-4">
						<input type="text" className="address-input last_name" ref="last_name" onChange={this.onAddressChange.bind(this)} />
					</div>

					<div className="col-xs-12 col-sm-2 address-label">Street address 1:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input street_1" type="text" ref="street_1" onChange={this.onAddressChange.bind(this)} />
				    </div>

					<div className="col-xs-12 col-sm-2 address-label">Street address 2:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input street_2" type="text" ref="street_2" onChange={this.onAddressChange.bind(this)} />
				    </div>

					<div className="col-xs-12 col-sm-2 address-label">City / town:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input city" type="text" ref="city" onChange={this.onAddressChange.bind(this)} />
				    </div>

					<div className="col-xs-12 col-sm-2 address-label">State / province:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input state" type="text" ref="state" onChange={this.onAddressChange.bind(this)} />
				    </div>

					<div className="col-xs-12 col-sm-2 address-label">Country</div>
					<div className="col-xs-12 col-sm-10"><CountrySelector /></div>

					<div className="col-xs-12 col-sm-2 address-label">Postal / zipcode:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input zip" type="text" ref="zip" onChange={this.onAddressChange.bind(this)} />
				    </div>

					<div className="col-xs-12 col-sm-2 address-label">Email:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input email" type="text" ref="email" onChange={this.onAddressChange.bind(this)} />
				    </div>
				    
					<div className="col-xs-12 col-sm-2 address-label">Phone:</div>
					<div className="col-xs-12 col-sm-10">
						<input className="address-input phone" type="text" ref="phone" onChange={this.onAddressChange.bind(this)} />
				    </div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(AddressForm)
