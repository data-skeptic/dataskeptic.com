import React, {Component} from 'react'


export default class CartItem extends Component {
    handleChange = amount => {
        const {id, quantity} = this.props
        if (quantity + amount) {
            this.props.changeQuantity(id, quantity + amount)
        }
        else {
            this.handleRemove()
        }
    }
    handleRemove = () => {
        const {id} = this.props
        this.props.removeItem(id)
    }

    render() {
        const {id, title, img, quantity, price} = this.props
        return (
            <div>
                <h4>{title}</h4>
                <img src={img} alt=""/>
                {quantity}
                <span>${price * quantity}</span>
                <button onClick={() => this.handleChange(1)}>+</button>
                <button onClick={() => this.handleChange(-1)}>-</button>
                <button onClick={this.handleRemove}>remove</button>
            </div>
        )
    }
}