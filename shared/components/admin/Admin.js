import React, { Component, PropTypes } from 'react'
import axios from "axios"
import { connect } from 'react-redux'

import SendEmail from './SendEmail'

class Admin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 'init',
			productId: undefined,
			errorMsg: '',
			designId: '58196cb41338d457459d579c',
			color: 'Black',
			quantity: '1',
			size: '',
			customerName: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipcode: '',
			country: 'US'
		}
		this.getProducts()
	}

	getProducts() {
		var self = this
		var uri = "https://api.scalablepress.com/v2/categories"
		axios
			.get(uri)
			.then(function(result) {
				self.setState({step: 'fetch_categories'})
				var products = result['data']
				for (var i in products) {
					var product = products[i]
					if (product['name'] == 'Short Sleeve Shirts') {
						var url = product['url']
						self.getProducts2(url)
					}
				}
			})
			.catch((err) => {
				console.log(err)
				self.setState({step: 'error', errorMsg: err})
			})			
	}

	getProducts2(uri) {
		this.setState({step: 'fetch_products'})
		var self = this
		axios
			.get(uri)
			.then(function(result) {
				var productId = "Not found"
				var products = result['data']['products']
				for (var i in products) {
					var product = products[i]
					if (product['name'] == 'Gildan Ultra Blend 50/50 T') {
						productId = product['id']
					}
				}
				if (productId != "Not found") {
					self.setState({step: 'ready'})
					self.setState({productId})
				}
			})
			.catch((err) => {
				console.log(this)
				self.setState({step: 'error', errorMsg: err})
			})			
	}

	orderTshirt() {
		var self = this
		var data = {
		  'type': 'dtg',
		  'products[0][id]': this.state.productId,
		  'address[name]': this.state.customerName,
		  'products[0][color]': this.state.color,
		  'products[0][quantity]': this.state.quantity,
		  'products[0][size]': this.state.size,
		  'address[address1]': this.state.address1,
		  'address[address2]': this.state.address2,
		  'address[city]': this.state.city,
		  'address[state]': this.state.state,
		  'address[zip]': this.state.zip,
		  'address[country]': this.state.country,
		  'designId': this.state.designId
		}
		var key = 'test_Z_gOWbE8iwjhXf4y4vqizQ'
	      var config = {
	        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
	        auth: ('', key)
	      };
		axios
			.post('https://api.scalablepress.com/v2/quote', data, config)
  			.then(function(resp) {
  			  console.log(resp)
  			})
			.catch((err) => {
				console.log(this)
				self.setState({step: 'error', errorMsg: err})
			})

		
	}

	formUpdate(e) {
		if (e != undefined) {
			var att = e.target.id
			var val = e.target.value
			var u = {}
			u[att] = val
			this.setState(u)
		}
	}

	render() {
		return (
			<div className="center">
				{this.state.step}
				{this.state.errorMsg}
				<h2>Admin</h2>
				<h3>Order processing</h3>
				<form>
					<table>
						<tbody>
							<tr>
								<td>Size:</td>
								<td>
									<select id="size">
										<option value='sml'>Small</option>
										<option value='med'>Medium</option>
										<option value='lrg'>Large</option>
										<option value='xlg'>X-Large</option>
										<option value='xxl'>XX-Large</option>
										<option value='xxxl'>3XL</option>
										<option value='xxxxl'>4XL</option>
										<option value='xxxxxl'>5XL</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>DesignID:</td>
								<td><input id="designId" value={this.state.designId} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Name:</td>
								<td><input id="customerName" value={this.state.customerName} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Address1</td>
								<td><input id="address1" value={this.state.address1} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Address2</td>
								<td><input id="address2" value={this.state.address2} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>City</td>
								<td><input id="city" value={this.state.city} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>State</td>
								<td><input id="state" value={this.state.state} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Zipcode</td>
								<td><input id="zipcode" value={this.state.zipcode} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Country</td>
								<td><input id="country" value={this.state.country} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Quantity</td>
								<td><input id="quantity" value={this.state.quantity} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
							<tr>
								<td>Color</td>
								<td><input id="color" value={this.state.color} onChange={this.formUpdate.bind(this)} /></td>
							</tr>
						</tbody>
					</table>
				</form>
				<button className="btn" onClick={this.orderTshirt.bind(this)}>Order T-shirt</button>

				<h4>Mark Fulfilled in Stripe</h4>
				<h4>Fulfill Order</h4>
				<h4>Send Confirmation Email</h4>
				<h4>Send Shipped Email</h4>
				<SendEmail />
				<div className="clear" />
			</div>
		)
	}
}

export default connect(state => ({ products: state.products }))(Admin)

/*


resp = requests.post('https://api.scalablepress.com/v2/quote', data=data, auth=('', key))

quote = json.loads(resp.content)
orderToken = quote['orderToken']

if quote.has_key('statusCode'):
  print(quote['statusCode'])

if quote.has_key('issues'):
  print(quote['issues'])

if quote.has_key('orderIssues'):
  print(quote['orderIssues'])

###########################################################################
# CREATE ORDER
###########################################################################

data = {
  'orderToken': orderToken
}

resp = requests.post('https://api.scalablepress.com/v2/order', data=data, auth=('', key))
order = json.loads(resp.content)

###########################################################################
# RESULTS
###########################################################################

print(quote)
print(order)
*/