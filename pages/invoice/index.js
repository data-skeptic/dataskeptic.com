import React, {Component} from 'react'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from './../../components/Container'

@Page
export default class InvoiceDetails extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const promises = []
        await Promise.all(promises)
    }

    render() {
        const {url: {query: {id}}} = this.props

        return (
            <Container title={`Invoice ${id}`}>
                Invoice {id} details
            </Container>
        );
    }
}