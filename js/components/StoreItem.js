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
				<div class="row prod-outer">
					<div class="col-xs-12 col-sm-4">
						<div class="prod-img">
							<img class="product-image" src={product.img} />
						</div>
					</div>
					<div class="col-xs-12 col-sm-8">
						<div class="row">
							<div class="col-xs-12">
								<div class="prod-desc">
									<span class="product-title">{product.title}</span>
									<br/>
									<span class="product-desc">{product.desc}</span>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-8 product-pull-down">
								<SizeSelector id={sizeSelectorId} sizes={product['sizes']} value={selection} onChange={this.onSizeSelection.bind(this)} />
							</div>
							<div class="col-xs-2 product-price">${product.price}</div>
							<div class="cls-xs-2">
								<button class={cls} id={btnId} onClick={this.onAddToCart.bind(this)}>+</button>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}
