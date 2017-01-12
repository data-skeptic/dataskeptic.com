import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	fulfilled: false
    }
  }
  fulfill(oid) {
  	var self = this
  	console.log(oid)
  	var req = {oid}
  	var url = "/api/order/fulfill"
  	var sreq = querystring.stringify(req)
  	var config = {
  		'Content-Type' : "application/x-www-form-urlencoded"
  	};
  	axios
  		.post(url, sreq, config)
  		.then(function(r) {
        console.log(r)
  	    var resp = r['data']
  			console.log("done")
  			console.log(resp)
  			if (resp['status'] == "fulfilled") {
  				self.setState({fulfilled: true})
  			} else {
  				var msg = JSON.stringify(r)
  				alert(msg)
  			}
  		})
		.catch(function(err) {
      console.log("api error")
			console.log(err)
		})
  }
  render() {
  	var order = this.props.order
  	var os = order.status
  	if (order.status == "paid" && !this.state.fulfilled) {
  		os = <button onClick={this.fulfill.bind(this, order.id)}>Fulfill</button>
  	}
    var created = order.created
    var d = new Date(created*1000)
    var dt = d.toLocaleDateString() + " " + d.toLocaleTimeString()
  	return (
  		<div className="row order-row">
  			<div className="col-xs-3">{order.email}</div>
  			<div className="col-xs-3">{dt}</div>
  			<div className="col-xs-3">{order.amount/100}</div>
  			<div className="col-xs-3">{os}</div>
  		</div>
  	)
  }
}
export default connect(state => ({ admin: state.admin }))(Order)
