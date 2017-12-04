import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {getBlogList} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'

@connect(
  state => ({
    posts: getBlogList(state)
  }),
  {}
)
export default class BlogList extends Component {
  constructor() {
    super()

  }


  render() {
    const {posts} = this.props;
    return (
      <Wrapper>
        {posts.map(post => <BlogListItem key={post.c_hash} post={post}/>)}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
    margin-top:20px;
    flex-grow: 1;
    
    flex-basis: 70%;
`
