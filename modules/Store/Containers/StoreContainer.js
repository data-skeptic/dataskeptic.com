import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getProducts,addToCart} from "../../../redux/modules/shopReducer";
import StoreItem from "../Components/StoreItem";


@connect(
    state => ({
        products:getProducts(state)
    }),
    {addToCart}
)

 export default class StoreContainer extends Component{
    addToCart = item => this.props.addToCart(item)

    render(){
        const {products} = this.props
        return(
            <div>
                {products.map(item => <StoreItem {...item} addToCart={this.addToCart}/>)}
            </div>
        )
    }
 }