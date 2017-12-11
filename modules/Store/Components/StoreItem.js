import React,{Component} from 'react'


export default class StoreItem extends Component{
    handleAdd = () =>{
        const {title,description,price,id} = this.props
        this.props.addToCart({title,description,price,id})
    }
    render(){
        const {title,description,price} = this.props
        return(
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{price}</span>
                <button onClick={this.handleAdd}>Add cart</button>
            </div>
        )
    }
}