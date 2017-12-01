import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {getCategories} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'

@connect(
  state => ({
    categories: getCategories(state)
  }),
  {}
)
export default class CategoryList extends Component {
  constructor() {
    super()

  }


  render() {
    const {categories} = this.props;
    return (
      <Wrapper>
        {categories && categories.map(post => JSON.stringify(categories))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
    background-color: #38383a;
    color: #fff;
    margin-top:20px;
    width: 30%;
    flex-basis: 30%;
    height: 50vh;
    position: sticky;
    top: 0px;
`
