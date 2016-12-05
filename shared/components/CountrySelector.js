import React from 'react'
import { connect } from 'react-redux';

var countries = [
	{short: "us", long: "United States of America"},
	{short: "ca", long: "Canada"},
	{short: "uk", long: "United Kingdom"},
	{short: "au", long: "Australia"},
	{short: "fr", long: "France"},
	{short: "de", long: "Germany"}
]

class CountrySelector extends React.Component {
	
	onChange(e) {
		var val = e.target.value
		var short = val
		var long = ""
		for (var i=0; i < countries.length; i++) {
			var country = countries[i]
			if (country.short == short) {
				long = country.long
			}
		}
		this.props.dispatch({type: "CHANGE_COUNTRY", payload: {short, long} })
	}

	render() {
		var ocart = this.props.cart.toJS()
		var short = ocart.country_short
		return (
			<div className="country-selector">
				<select className="country" onChange={this.onChange.bind(this)} value={short}>
					{countries.map(function(country) {
						return (
							<option key={country.short} value={country.short}>{country.long}</option>
						)
					})}
				</select>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(CountrySelector)

