import React,{Component} from 'react'


export default class StoreItem extends Component{

    render(){
        const {title,description,price} = this.props
        return(
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{price}</span>
                <button>Add cart</button>
            </div>
        )
    }
}