import React, {Component} from 'react'
import Page from '../../hoc/Page'
import {loadProducts} from "../../redux/modules/shopReducer";
import {productList} from "../../modules/Store/mokedData";
import StoreContainer from "../../modules/Store/Containers/StoreContainer";
import Container from '../../components/Container'

@Page
export default class Services extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        promises.push(dispatch(loadProducts(productList)))

        await Promise.all(promises)
    }

    render() {
        return (
            <Container global title={`Store`}>
                <StoreContainer/>
            </Container>
        )
    }
}
