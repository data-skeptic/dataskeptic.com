import axios from 'axios'
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import Loading from '../../Common/Components/Loading'
import Order from './Order'

class OpenOrders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: []
		}
	}
  	componentDidMount() {
  		var self = this
	  	var uri = "/api/order/list"
		axios
			.get(uri)
			.then(function(result) {
				var orders = result['data']["data"]
				self.setState({orders})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	render() {
		var oadmin = this.props.admin.toJS()
		var ocart = this.props.cart.toJS()
	  	if (this.state.orders.length == 0) {
	  		return <Loading />
		}
	    return (
	    	<div>
	    		<h3>Recent Orders</h3>
				{
					this.state.orders.map(function(order) {
						return (<div key={order.id}>
							<Order order={order} />
						</div>)
					})
				}
	    	</div>
	    )
	}
}

export default connect(state => ({ cart: state.cart, admin: state.admin }))(OpenOrders)
