import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getActiveCategory, getCategories,setActiveCategory} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'
import CategoriesListItem from "../Components/CategoriesListItem";
import Router from '../../../components/Router'

@connect(
    state => ({
        categories: getCategories(state),
        activeCategory:getActiveCategory(state)
    }),
    {setActiveCategory}
)
export default class CategoryList extends Component {
    setActiveCategory = label => {
        Router.pushRoute(`/blogs/${label}`)
    }
    render() {
        const {categories} = this.props;
        return (
            <Wrapper>
                <Title>Categories</Title>
                <List>
                    {categories && categories.map(category => <CategoriesListItem
                        key={category.id}
                        setActiveCategory={this.setActiveCategory}
                        activeCategory={this.props.activeCategory}
                        {...category}/>)}
                </List>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    background-color: #38383a;
    color: #fff;
    margin-top:20px;
    padding: 0 30px;
    width: 30%;
    flex-basis: 30%;
    height: 100%;
    position: sticky;
    top: 64px;
    padding-bottom: 30px;
`
const Title = styled.h2`
  
`
const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
export const Item = styled.li`
  padding:5px 0;
  cursor: pointer;
  color:${props => props.active ? "yellow" : "white"}
`