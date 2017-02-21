import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import CountrySelector from './CountrySelector'

class AddressForm extends Component {
	constructor(props) {
		super(props)
	}
	componentDidUpdate(){
		var ocart = this.props.cart.toJS()
		var focus = ocart.focus
		if (focus != "") {
			ReactDOM.findDOMNode(this.refs[focus]).focus()
			this.props.dispatch({type: "CLEAR_FOCUS", payload: false })
		}
	}

	onAddressChange(event) {
		var target = event.target
		var cls = target.className
		cls = cls.replace("address-input ", "")
		var val = target.value
		this.props.dispatch({type: "UPDATE_ADDRESS", payload: {cls, val} })
	}

	render() {
		var ocart = this.props.cart.toJS()
		var address = ocart.address
		var focus_msg = ocart.focus_msg
		var title = this.props.title
		var abox = <div></div>
		if (focus_msg != "") {
			abox = <div className="col-xs-12 address-validation-msg">{focus_msg}</div>
		}
		return (
			<div className="address-form-container">
				<div className="address-form">
					<div className="shipping-address-title">{title}</div>
					{abox}

					<div className="row no-clear">
						<div className="col-md-6">
							<div className="address-label">First name <span className="required">*</span></div>
							<div className="">
								<input autoFocus={true} type="text" className="address-input first_name" ref="first_name" value={address.first_name} onChange={this.onAddressChange.bind(this)} placeholder="John"/>
							</div>
						</div>

						<div className="col-md-6">
							<div className="address-label">Last name <span className="required">*</span></div>
							<div className="">
								<input type="text" className="address-input last_name" ref="last_name" value={address.last_name} onChange={this.onAddressChange.bind(this)} placeholder="Smith"/>
							</div>
						</div>
					</div>

					<div className="row no-clear">
						<div className="col-md-8">
							<div className="address-label">Street Address <span className="required">*</span></div>
							<div className="">
								<input className="address-input street_1" type="text" ref="street_1" value={address.street_1} onChange={this.onAddressChange.bind(this)} placeholder="123 Main Street"/>
							</div>
						</div>
						<div className="col-md-4">
							<div className="address-label">Apt, suite, etc. <span className="required">*</span></div>
							<div className="">
								<input className="address-input street_2" type="text" ref="street_2" value={address.street_2} onChange={this.onAddressChange.bind(this)} placeholder="Apt 101"/>
							</div>
						</div>
					</div>

					<div className="row no-clear">
						<div className="col-md-12">
							<div className="address-label">City / Town <span className="required">*</span></div>
							<div className="">
								<input className="address-input city" type="text" ref="city" value={address.city} onChange={this.onAddressChange.bind(this)} placeholder="Los Angeles"/>
							</div>
						</div>
					</div>

					<div className="row no-clear">
						<div className="col-md-5">
							<div className="address-label">Country <span className="required">*</span></div>
							<div className=""><CountrySelector /></div>
						</div>
						<div className="col-md-4">
							<div className="address-label">State / Province <span className="required">*</span></div>
							<div className="">
								<input className="address-input state" type="text" ref="state" value={address.state} onChange={this.onAddressChange.bind(this)} />
							</div>
						</div>
						<div className="col-md-3">
							<div className="address-label">Zip Code <span className="required">*</span></div>
							<div className="">
								<input className="address-input zip" type="text" ref="zip" value={address.zip} onChange={this.onAddressChange.bind(this)} placeholder="12345"/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<div className="address-label">Email <span className="required">*</span></div>
							<div className="">
								<input className="address-input email" type="text" ref="email" value={address.email} onChange={this.onAddressChange.bind(this)} placeholder="j.smith@work.com"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="address-label">Phone </div>
							<div className="">
								<input className="address-input phone" type="text" ref="phone" value={address.phone} onChange={this.onAddressChange.bind(this)} placeholder="(310) 313 - 3413"/>
							</div>
						</div>
					</div>

				</div>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(AddressForm)
