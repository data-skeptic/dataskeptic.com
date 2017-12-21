import React, {Component} from 'react'
import Page from '../../hoc/Page'
import styled from 'styled-components'
import Container from '../../components/Container'
import CheckoutForm from '../../modules/Checkout/Containers/CheckoutForm'
import Cart from '../../modules/Store/Containers/Cart'
import { media } from '../../modules/styles'

@Page
export default class Checkout extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container global fullWidth title={`Checkout`}>
                <Wrapper>
                    <Form>
                        <CheckoutForm />
                    </Form>

                    <CartArea>
                        <Cart checkoutButton={false}/>
                    </CartArea>
                </Wrapper>
            </Container>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    background: #FAFAFA;
    border-bottom: 1px solid #D7D9D9;
    
    ${media.phone`
        flex-direction: column;
    `}
`

const Form = styled.div`
    flex-basis: 70%;
    padding: 15px;
    
    padding-top: 57px;
    padding-right: 7%;
    padding-left: 7%;
    padding-bottom: 57px;
    border-right: 1px solid #D7D9D9;
    
    ${media.phone`
        border-top: 1px solid #D7D9D9;
        border-right: 0px;
        padding: 15px;
        flex-basis: 100%;
        order: 2;
    `}
`

const CartArea = styled.div`
    flex-basis: 30%;
    padding: 25px;
    
    ${media.phone`
        flex-basis: 100%;
        order: 1;
    `}
`