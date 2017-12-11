import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getProducts} from "../../../redux/modules/shopReducer";
import StoreItem from "../Components/StoreItem";


@connect(
    state => ({
        products:getProducts(state)
    }),
    {}
)

 export default class StoreContainer extends Component{
    render(){
        const {products} = this.props
        return(
            <div>
                {products.map(item => <StoreItem {...item}/>)}
            </div>
        )
    }
 }