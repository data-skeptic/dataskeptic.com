import React, {Component} from 'react'
import Page from '../../hoc/Page'
import styled from 'styled-components'
import Container from '../../components/Container'
import CheckoutForm from '../../modules/Checkout/Containers/CheckoutForm'
import Cart from '../../modules/Store/Containers/Cart'

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
    
    
`

const Form = styled.div`
    flex-basis: 75%;
    padding: 15px;
    
    padding-right: 400px;
    padding-top: 57px;
    padding-left: 10%;
    padding-bottom: 57px;
    border-right: 1px solid #D7D9D9;
`

const CartArea = styled.div`
    flex-basis: 25%;
    padding: 25px;
`