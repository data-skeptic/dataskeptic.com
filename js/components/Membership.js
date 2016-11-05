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
		console.log("render membership")
		if (!this.props.products_loaded) {
			return <div><Loading /></div>
		} else {
			var products = this.props.products
			var me = this
			return (
				<div class="center">
					{products.map(function(product) {
						if (product.active == 1 && product.type=="membership") {
							var pid = product.id
							console.log(product)
							return (
								<div key={pid} class="membership-container">
									<img class="membership-img" src={product.img} />
									<div class="membership-title">{product.title}</div>
									<div class="membership-desc">{product.desc}</div>
									<div class="membership-price">${product.price}</div>
									<button class="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
								</div>
							)
						}
					})}
				</div>
			)
		}		
	}
}