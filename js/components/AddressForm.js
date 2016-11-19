import React from 'react'

const AddressForm = props => {
	return (
		<div class="row address-form">
			<div class="col-xs-12 shipping-address-title">{props.title}</div>
			<div class="col-xs-12 col-sm-2 address-label">First name:</div>
			<div class="col-xs-12 col-sm-4">
				<input type="text" class="address-input first_name" onChange={props.onAddressChange} />
			</div>

			<div class="col-xs-12 col-sm-2 address-label">Last name:</div>
			<div class="col-xs-12 col-sm-4">
				<input type="text" class="address-input last_name" onChange={props.onAddressChange} />
			</div>

			<div class="col-xs-12 col-sm-2 address-label">Street address 1:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input street_1" type="text" onChange={props.onAddressChange} />
		    </div>

			<div class="col-xs-12 col-sm-2 address-label">Street address 2:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input street_2" type="text" onChange={props.onAddressChange} />
		    </div>

			<div class="col-xs-12 col-sm-2 address-label">City / town:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input city" type="text" onChange={props.onAddressChange} />
		    </div>

			<div class="col-xs-12 col-sm-2 address-label">State / province:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input state" type="text" onChange={props.onAddressChange} />
		    </div>

			<div class="col-xs-12 col-sm-2 address-label">Country</div>
			<div class="col-xs-12 col-sm-10 address-label">{props.country}</div>

			<div class="col-xs-12 col-sm-2 address-label">Postal / zipcode:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input zip" type="text" onChange={props.onAddressChange} />
		    </div>

			<div class="col-xs-12 col-sm-2 address-label">Email:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input email" type="text" onChange={props.onAddressChange} />
		    </div>
		    
			<div class="col-xs-12 col-sm-2 address-label">Phone:</div>
			<div class="col-xs-12 col-sm-10">
				<input class="address-input phone" type="text" onChange={props.onAddressChange} />
		    </div>
		</div>
	)
}

export default AddressForm