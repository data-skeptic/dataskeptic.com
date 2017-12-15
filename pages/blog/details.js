import React, {Component} from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from "../../components/Container";
import {loadSingleBlog, getSingle} from "../../redux/modules/blogReducer";
import BlogPost from '../../modules/Blogs/Containers/BlogSingle'

@Page
export default class BlogDetails extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const {category, year, name} = query;
        const prettyName = `${category}/${year}/${name}`
        const promises = []

        console.dir(`loadSingleBlog`)
        if (!getSingle(state)) {
            promises.push(dispatch(loadSingleBlog(prettyName)))
        }

        await Promise.all(promises)
    }

    render() {
        return (
            <Container>
                <BlogPost />
            </Container>
        )
    }
}


const Title = styled.h1`
  color: red;
  text-align: center;
`