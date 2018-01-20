import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

const EmptyCart = props => {
	return (
			<div className="thank-you">
				<p>Your cart is empty.</p>
				<p>If you take the union of your cart and the null set, you get your cart again.  It's a closed form.</p>
				<p>There aren't that many items in the store at this point.  You could randomly select one if you'd like.</p>
			</div>
	)		
}

export default EmptyCart
