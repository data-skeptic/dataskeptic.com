import React from 'react'

const AddressForm = props => {
	return (
		<div class="address-form">
			<span class="shipping-address-title">{props.title}</span>
			<div class="name-row">
				<div class="shipping-label">First name:</div>
				<input type="text" id="first_name" class="checkout-name-field" />
				<div class="shipping-label">Last name:</div>
				<input type="text" id="last_name" class="checkout-name-field" />
			</div>
			<div class="address-row-1">
				<div class="shipping-label">Street address 1:</div>
				<input id="street_1" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row-2">
				<div class="shipping-label">Street address 2:</div>
				<input id="street_2" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row-3">
				<div class="shipping-label">City / town:</div>
				<input id="city" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row-4">
				<div class="shipping-label">State / province:</div>
				<input id="state" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row-5">
				<div class="shipping-label">Country</div>
				<select id="country" class="checkout-country-field">
					<option value="United State of America" />
					<option value="Canada" />
					<option value="UK" />
					<option value="Australia" />
					<option value="France" />
				</select>
		    </div>
			<div class="address-row-6">
				<div class="shipping-label">Postal / zipcode:</div>
				<input id="zip" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row-7">
				<div class="shipping-label">Phone:</div>
				<input id="phone" type="text" class="checkout-address-field" />
		    </div>
		</div>
	)
}

export default AddressForm