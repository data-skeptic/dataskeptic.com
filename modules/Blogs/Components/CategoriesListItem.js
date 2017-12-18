import React,{Component} from 'react'
import {Item} from "../Containers/CategoryList";

export default class CategoriesListItem extends Component{
    isActive = (activeCategory,category) => activeCategory === category
    handleClick = () =>{
        this.props.setActiveCategory(this.props.category)
    }

    render(){
        const {category,activeCategory} = this.props
        return(
            <Item active={this.isActive(activeCategory,category)} onClick={this.handleClick}>{category}</Item>
        )
    }
}
