import React,{Component} from 'react'


export default class CartItem extends Component{
 render(){
     const {title,img,quantity,price} = this.props
     return(
         <div>
             <h4>{title}</h4>
             <img src={img} alt=""/>
             {quantity}
             <span>${price*quantity}</span>
         </div>
     )
 }
}