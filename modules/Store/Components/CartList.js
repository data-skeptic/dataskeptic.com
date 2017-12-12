import React from 'react'

const CartList = ({amount, cartList}) => (
    <div>
        {!amount
            ? <p>
                Your cart is empty.
                If you take the union of your cart and the null set, you get your cart again.
                Your cart has a closed form under addition, so why not head over to the Store and put something in it.
            </p>
            : cartList.map(item => <div>{item.title}</div>)
        }


    </div>
)
export default CartList