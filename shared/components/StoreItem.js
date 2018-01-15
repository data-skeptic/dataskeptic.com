import React from 'react'
import {connect} from 'react-redux'

import Loading from '../Common/Components/Loading'
import CartContainer from '../Cart/Containers/CartContainer'
import SizeSelector from './SizeSelector'

class Store extends React.Component {
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
            this.props.dispatch({type: "ADD_TO_CART", payload: {product, size}})
        }
        this.setState({wasClicked: true})
        var me = this
        setTimeout(function () {
            me.setState({wasClicked: false})
        }, 1000);
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
                <div className="row prod-outer">
                    <div className="col-xs-12 col-sm-4">
                        <div className="prod-img">
                            <img className="product-image" src={product.img}/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="prod-desc">
                                    <span className="product-title">{product.title}</span>
                                    <br/>
                                    <span className="product-desc">{product.desc}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-8 product-pull-down">
                                <SizeSelector id={sizeSelectorId} sizes={product['sizes']} value={selection}
                                              onChange={this.onSizeSelection.bind(this)}/>
                            </div>
                            <div className="col-xs-2 product-price">${product.price}</div>
                            <div className="cls-xs-2">
                                <button className={cls} id={btnId} onClick={this.onAddToCart.bind(this)}>+</button>
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

export default connect(
    (state) => ({
        cart: state.cart
    })
)(Store);