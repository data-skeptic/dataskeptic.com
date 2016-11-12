import React from 'react'

import Loading from './Loading'

export default class Membership extends React.Component {
	constructor(props) {
		super(props)
	}

	addToCart(event, product) {
		this.props.addToCart(product, "")
	}

	render() {
		console.log("render membership!")
		if (!this.props.products_loaded) {
			return <div><Loading /></div>
		} else {
			var products = this.props.products
			products.sort(function(a, b) {
				return a['price'] - b['price']
			})
			var me = this
			return (
				<div class="center">
					<h2>Data Skeptic Membership</h2>
					<p>Your membership supports Data Skeptic's ability to continue delivering quality content on a weekly basis and expand into new mediums.  For $1 per episode, your contributions can help us launch more projects and continuously improve the content of the podcast.</p>
					<p>We have some surprise members only perks planned for 2017.  Sign up now so you don't miss out on those.</p>
					{products.map(function(product) {
						if (product.active == 1 && product.type=="membership") {
							var pid = product.id
							return (
								<div key={pid} class="membership-container">
									<img class="membership-img" src={product.img} />
									<div class="membership-title">{product.title}</div>
									<div class="membership-desc">{product.desc}</div>
									<div class="membership-bottom-container">
										<div class="membership-price">${product.price}</div>
										<button class="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
									</div>
								</div>
							)
						}
					})}
					<div class="clear"></div>
				</div>
			)
		}		
	}
}