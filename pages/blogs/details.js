import React, { Component } from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from "../../components/Container";
import {loadSingleBlog} from "../../redux/modules/blogReducer";
import BlogPost from '../../modules/Blogs/Containers/BlogSingle'
@Page
export default class BlogDetails extends Component {
    static async getInitialProps({ store: { dispatch, getState }, query }) {
        const {id} = query;
        const promises = []
         promises.push(dispatch(loadSingleBlog(id)))
         await Promise.all(promises)
    }

    render() {
        const { url: { query: { id } } } = this.props
        return (
            <Container>
              {id ? <BlogPost/> : <h1>No such page</h1>}

            </Container>
        )
    }
}


const Title = styled.h1`
  color: red;
  text-align: center;
`