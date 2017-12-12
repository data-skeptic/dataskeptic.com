import React from 'react'
import CartItem from "./CartItem";

const CartList = ({amount, cartList, changeQuantity, removeItem, clearCart}) => (
    <div>

        {!amount
            ? <p>
                Your cart is empty.
                If you take the union of your cart and the null set, you get your cart again.
                Your cart has a closed form under addition, so why not head over to the Store and put something in it.
            </p>
            : <div>
                <button onClick={clearCart}>Clear</button>
                {cartList.map(item => <CartItem {...item}
                                                changeQuantity={changeQuantity}
                                                removeItem={removeItem}
                                                key={item.id}

                />)}
            </div>
        }


    </div>
)
export default CartList