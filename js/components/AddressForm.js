import React from 'react'

const AddressForm = () => {
	return (
		<div class="address-form">
			<div class="large-8 small-centered columns">
			    <fieldset>
			        <legend>Shipping address</legend>
			        <div class="row">
			            <div class="small-12 columns">
			                <label for="first_name">First name</label>
			                <input type="text" id="first_name"></input>
			            </div>
			        </div>    
			        <div class="row">
			            <div class="small-12 columns">
			                <label for="last_name">Last name</label>
			                <input type="text" id="last_name"></input>
			            </div>
			        </div>    
			        <div class="row">
			            <div class="small-12 columns">
			                <label for="address_1">Address 1</label>
			                <input type="text" id="address_1"></input>
			            </div>
			        </div>    
			        <div class="row">
			            <div class="small-12 columns">
			                <label for="address_2">Address 2</label>
			                <input type="text" id="address_2"></input>
			            </div>
			        </div>    
			        <div class="row">
			            <div class="small-12 columns">
			                <label for="town_city">Town/city</label>
			                <input type="text" id="town_city"></input>
			            </div>
			        </div>    
			        <div class="row">
			            <div class="small-8 columns">
			                <label for="state_province">State/province</label>
			                <input type="text" id="state_province"></input>
			            </div>
			            <div class="small-4 columns">
			                <label for="postcode_zip">Postcode/zip</label>
			                <input type="text" id="postcode_zip"></input>
			            </div>
			        </div>    
			        <div class="row">
			            <div class="small-12 columns">
			                <label for="phone">Phone</label>
			                <input type="tel" id="phone"></input>
			            </div>
			        </div>    
			    </fieldset>
			</div>
		</div>
	)
}

export default AddressForm