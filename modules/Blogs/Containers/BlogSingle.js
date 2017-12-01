import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {getSingle} from '../../../redux/modules/blogReducer'
import Post from '../Components/Post'
import AuthorBlock from '../Components/AuthorBlock'

@connect(
  state => ({
    post: getSingle(state)
  }),
  {}
)
export default class BlogSingle extends Component {
  constructor() {
    super()

  }


  render() {
    const {post} = this.props;
    return (
      <Wrapper>
        <Post post={post}/>
        <AuthorBlock author={post.contributor}/>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
    margin: 0px 150px;
    margin-top:20px;
    flex-grow: 1;
    
`
const Date = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #7d8080;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
  font-family: 'SF Medium'
`;