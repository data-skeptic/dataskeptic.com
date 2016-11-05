import React from 'react'

const AddressForm = props => {
	return (
		<div class="address-form">
			<span class="shipping-address-title">{props.title}</span>
			<div class="address-row">
				<div class="address-name-label">First name:</div>
				<input type="text" class="first_name" />
				<div class="address-name-label">Last name:</div>
				<input type="text" class="last_name" />
			</div>
			<div class="address-row">
				<div class="address-street-label">Street address 1:</div>
				<input class="street_1" type="text" />
		    </div>
			<div class="address-row">
				<div class="address-street-label">Street address 2:</div>
				<input class="street_2" type="text" />
		    </div>
			<div class="address-row">
				<div class="city-label">City / town:</div>
				<input class="city" type="text" />
				<div class="state-label">State / province:</div>
				<input class="state" type="text" />
		    </div>
			<div class="address-row">
				<div class="country-label">Country</div>
				<select class="country">
					<option value="us">United States of America</option>
					<option value="ca">Canada</option>
					<option value="uk">UK</option>
					<option value="au">Australia</option>
					<option value="fr">France</option>
				</select>
				<div class="zip-label">Postal / zipcode:</div>
				<input class="zip" type="text" />
		    </div>
			<div class="address-row">
				<div class="phone-label">Phone:</div>
				<input class="phone" type="text" />
		    </div>
		</div>
	)
}

export default AddressForm