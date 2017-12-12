import React from 'react'
import CartItem from "./CartItem";

const CartList = ({amount, cartList}) => (
    <div>
        {!amount
            ? <p>
                Your cart is empty.
                If you take the union of your cart and the null set, you get your cart again.
                Your cart has a closed form under addition, so why not head over to the Store and put something in it.
            </p>
            : cartList.map(item => <CartItem {...item}/>)
        }


    </div>
)
export default CartList