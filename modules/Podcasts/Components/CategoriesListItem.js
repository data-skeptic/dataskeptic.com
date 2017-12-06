import React,{Component} from 'react'
import {Item} from "../Containers/YearList";

export default class CategoriesListItem extends Component{
    isActive = (activeYear,year) => activeYear === year
    handleClick = () =>{
        this.props.setActiveYear(this.props.value)
    }

    render(){
        const {value,activeYear} = this.props
        return(
            <Item active={this.isActive(activeYear,value)} onClick={this.handleClick}>{value}</Item>
        )
    }
}
