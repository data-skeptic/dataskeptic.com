import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getActiveCategory, getCategories, setActiveCategory, loadBlogList, getPage} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'
import CategoriesListItem from "../Components/CategoriesListItem";
import ParamRouter from '../../../components/Router'
import Router from 'next/router'
import {media} from "../../styles";

@connect(
    state => ({
        categories: getCategories(state),
        activeCategory: getActiveCategory(state),
        page: getPage(state)
    }),
    { setActiveCategory, loadBlogList }
)
export default class CategoryList extends Component {

    setActiveCategory = category => {
        ParamRouter.pushRoute(`Category`, {category})
        // this.props.setActiveCategory(category)
    }

    render() {
        const {categories, activeCategory} = this.props;

        return (
            <Wrapper>
                <Title>Categories</Title>
                <List>
                    <CategoriesListItem
                        setActiveCategory={this.setActiveCategory}
                        activeCategory={activeCategory}
                        category={'all'}
                    />

                    {categories && categories.map(category => <CategoriesListItem
                        key={category}
                        setActiveCategory={this.setActiveCategory}
                        activeCategory={activeCategory}
                        category={category}/>)}
                </List>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    background-color: #38383a;
    color: #fff;
    padding: 0 30px;
    margin-top:20px;
    width: 30%;
    flex-basis: 30%;
    height: 100%;
    position: sticky;
    top: 64px;
    padding-bottom: 30px;

    ${media.phone`
        padding-top:20px;
        margin-top:0px;
        flex-basis: 100%;
        width: 100%;
    `};
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
  text-transform: capitalize;
`