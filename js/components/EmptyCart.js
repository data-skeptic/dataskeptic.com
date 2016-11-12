import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

const EmptyCart = props => {
	return (
			<div class="thank-you">
				<h1>Cart</h1>
				<p>Your cart is empty.</p>
				<p>If you take the union of your cart and the null set, you get your cart again.</p>
				<p>Your cart has a closed form under addition, so why not head over to the <Link to="/store">Store</Link> and put something in it.</p>
			</div>
	)		
}

export default EmptyCart
