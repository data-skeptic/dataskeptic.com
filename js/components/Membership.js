import React from 'react'

import Loading from './Loading'

export default class Membership extends React.Component {
	render() {
		var products = this.props.products
		if (this.state.stripeLoading || !this.props.products_loaded) {
			return <div><Loading /></div>
		} else {
			return (
				<div class="center">
					{products.map(function(product) {
						if (product.active == 1 && product.type=="membership") {
							return (
								<div key="{product.id}">
									{product.title}
									<br />
									<p>{product.desc}</p>
								</div>
							)
						}
					})}
				</div>
			)
		}		
	}
}