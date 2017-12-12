import React, {Component} from 'react'
import styled from 'styled-components'
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
            <Container global>
                <StoreContainer/>
            </Container>
        )
    }
}


const Title = styled.h1`
  color: red;
  text-align: center;
`
const ServiceWrapper = styled.div`
  max-width:800px;
  margin:0 auto;
`