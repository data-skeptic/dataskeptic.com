import React from 'react'

const AddressForm = props => {
	return (
		<div class="address-form">
			<span class="shipping-address-title">{props.title}</span>
			<div class="address-row">
				<div class="address-name-label">First name:</div>
				<input type="text" class="first_name" ref="first_name" onChange={props.onAddressChange} />
				<div class="address-name-label">Last name:</div>
				<input type="text" class="last_name" ref="last_name" onChange={props.onAddressChange} />
			</div>
			<div class="address-row">
				<div class="address-street-label">Street address 1:</div>
				<input class="street_1" type="text" ref="street_1" onChange={props.onAddressChange} />
		    </div>
			<div class="address-row">
				<div class="address-street-label">Street address 2:</div>
				<input class="street_2" type="text" ref="street_2" onChange={props.onAddressChange} />
		    </div>
			<div class="address-row">
				<div class="city-label">City / town:</div>
				<input class="city" type="text" ref="city" onChange={props.onAddressChange} />
				<div class="state-label">State / province:</div>
				<input class="state" type="text" ref="state" onChange={props.onAddressChange} />
		    </div>
			<div class="address-row">
				<div class="country-label">Country</div>
				{props.country}
				<div class="zip-label">Postal / zipcode:</div>
				<input class="zip" type="text" ref="zip" onChange={props.onAddressChange} />
		    </div>
			<div class="address-row">
				<div class="phone-label">Phone:</div>
				<input class="phone" type="text" ref="phone" onChange={props.onAddressChange} />
		    </div>
		</div>
	)
}

export default AddressForm