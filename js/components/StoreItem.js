import React from 'react'

import Loading from './Loading'
import Cart from './Cart'
import SizeSelector from './SizeSelector'

export default class Store extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sizeSelected: undefined,
			wasClicked: false
		}
	}

	onSizeSelection(event) {
		var select = event.target
		var id = select.id.split("_")[1]
		var sizeSelected = select.value
		this.setState({sizeSelected})
	}

	onAddToCart(event) {
		console.log("oatc")
		console.log(this.props)
		var btn = event.target
		var id = btn.id.split("_")[1]
		var product = this.props.product
		var size = ""
		if (product["id"] == id) {
			if (product['sizes'] != undefined) {
				size = this.state.sizeSelected
				if (size == undefined) {
					alert("Please select a size first")
					return;
				}
			}
			this.props.addToCart(product, size)
		}
		this.setState({wasClicked: true})
		var me = this
		setTimeout(function(){ me.setState({wasClicked: false}) }, 1000);
	}

	render() {
		var product = this.props.product
		if (product.active == 1 && product.type != "membership") {
			var btnId = "add_" + product.id
			var sizeSelectorId = "ss_" + product.id
			var selection = this.state.sizeSelected
			var cls = "add-to-cart"
			if (this.state.wasClicked) {
				cls = "add-to-cart-clicked"
			}
			return (
				<div class="product-outer">
					<div class="product-row">
						<div class="product-main">
							<img class="product-image" src={product.img} />
							<div class="product-inner">
								<div class="product-title">{product.title}</div>
								<div class="product-desc">{product.desc}</div>
							</div>
						</div>

						<div class="product-right">
							<div class="product-right-top">
								<div class="product-pull-down">
									<SizeSelector id={sizeSelectorId} sizes={product['sizes']} value={selection} onChange={this.onSizeSelection.bind(this)} />
								</div>
								<div class="product-price">
									${product.price}
									<button class={cls} id={btnId} onClick={this.onAddToCart.bind(this)}>+</button>
								</div>
							</div>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}
