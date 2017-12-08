import React, {Component} from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import {SERVICES} from "../../modules/Helpers/Contants";
import ServiceList from '../../modules/Services/Components/ServiceList'
import styled from 'styled-components'
import Page from '../../hoc/Page'

@Page
export default class Services extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container>
                <ServiceWrapper>
                    <ServiceList
                        list={SERVICES}
                    />
                </ServiceWrapper>
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
const ServiceWrapper = styled.div`
  max-width:800px;
  margin:0 auto;
`