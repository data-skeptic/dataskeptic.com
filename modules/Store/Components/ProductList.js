import React from 'react'
import StoreItem from "./StoreItem";

const ProductList = ({products,addToCart}) =>(
    <div>
        {products.map(item => <StoreItem {...item} key={item.id} addToCart={addToCart}/>)}
    </div>

)
export default ProductList