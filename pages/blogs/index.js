import React, { Component } from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import {loadBlogList} from "../../redux/modules/blogReducer";

@Page
export default class Dashboard extends Component {
    static async getInitialProps({ store: { dispatch, getState }, query }) {
        const state = getState()
        const promises = []
         promises.push(dispatch(loadBlogList()))
         await Promise.all(promises)
    }

    render() {
        return (
            <Container>
                <Title>Blogs Page</Title>

                <Link href="/">Home</Link>
            </Container>
        )
    }
}

const Container = styled.div`

`

const Title = styled.h1`
  color: red;
  text-align: center;
`