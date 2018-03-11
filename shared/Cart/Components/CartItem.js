import React from 'react'

import CartQuantity from './CartQuantity'

export const CartItem = ({
  title,
  product,
  quantity,
  size = <br />,
  subtype,
  subtotal,
  onRemoveClick
}) => (
  <div className="cart-row cart-item">
    <div className="remove">
      <button
        onClick={e => {
          onRemoveClick(product, size)
        }}
      >
        <img
          src="https://s3.amazonaws.com/dataskeptic.com/img/svg/x.svg"
          alt=""
        />
      </button>
    </div>
    <div className="product">
      <div className="product-preview">
        <img src={product.img} alt={title} />
      </div>
      <div className="in">
        <div className="product-description">
          <p className="title">{title}</p>
          <p className="subtype">{size}</p>
        </div>

        <div className="counter inline">
          <CartQuantity
            updateable={true}
            quantity={quantity}
            product={product}
            size={size}
          />
        </div>
        <div className="price inline">
          <span>${subtotal}</span>
        </div>
      </div>
    </div>
  </div>
)

export default CartItem
