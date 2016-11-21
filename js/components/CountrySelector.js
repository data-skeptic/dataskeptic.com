import React from 'react'

export default class CountrySelector extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			countries: [
				{short: "us", long: "United States of America"},
				{short: "ca", long: "Canada"},
				{short: "uk", long: "United Kingdom"},
				{short: "au", long: "Australia"},
				{short: "fr", long: "France"},
				{short: "de", long: "Germany"}
			]
		}
		this.onChange = this.onChange.bind(this)
	}
	
	onChange(e) {
		var val = e.target.value
		var short = val
		var long = ""
		for (var i=0; i < this.state.countries.length; i++) {
			var country = this.state.countries[i]
			if (country.short == short) {
				long = country.long
			}
		}
		this.props.onChangeCountry(short, long)
	}

	render() {
		var scountry = this.props.country
		return (
			<div class="country-selector">
				Country: 
				<select class="country" onChange={this.onChange} value={scountry.short}>
					{this.state.countries.map(function(country) {
						return (
							<option key={country.short} value={country.short}>{country.long}</option>
						)
					})}
				</select>
			</div>
		)
	}
}
