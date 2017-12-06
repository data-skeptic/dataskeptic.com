import React,{Component} from 'react'
import {Item} from "../Containers/YearList";

export default class CategoriesListItem extends Component{
    isActive = (activeCategory,prettyName) => activeCategory === prettyName
    handleClick = () =>{
        this.props.setActiveCategory(this.props.prettyName)
    }

    render(){
        const {id,label,prettyName,activeCategory} = this.props
        return(
            <Item active={this.isActive(activeCategory,prettyName)} onClick={this.handleClick}>{label}</Item>
        )
    }
}
