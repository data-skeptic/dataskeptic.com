import React from 'react'

const AddressForm = props => {
	return (
		<div class="address-form">
			<span class="shipping-address-title">{props.title}</span>
			<div class="address-row">
				<div class="address-label">First name:</div>
				<input type="text" id="first_name" class="checkout-name-field" />
				<div class="address-label">Last name:</div>
				<input type="text" id="last_name" class="checkout-name-field" />
			</div>
			<div class="address-row">
				<div class="address-label">Street address 1:</div>
				<input id="street_1" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row">
				<div class="address-label">Street address 2:</div>
				<input id="street_2" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row">
				<div class="address-label">City / town:</div>
				<input id="city" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row">
				<div class="address-label">State / province:</div>
				<input id="state" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row">
				<div class="address-label">Country</div>
				<select id="country" class="checkout-country-field">
					<option value="us">United States of America</option>
					<option value="ca">Canada</option>
					<option value="uk">UK</option>
					<option value="au">Australia</option>
					<option value="fr">France</option>
				</select>
		    </div>
			<div class="address-row">
				<div class="address-label">Postal / zipcode:</div>
				<input id="zip" type="text" class="checkout-address-field" />
		    </div>
			<div class="address-row">
				<div class="address-label">Phone:</div>
				<input id="phone" type="text" class="checkout-address-field" />
		    </div>
		</div>
	)
}

export default AddressForm