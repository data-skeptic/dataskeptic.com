import React from 'react'
import CartItem from "./CartItem";
import styled from 'styled-components'
const CartList = ({amount, cartList, changeQuantity, removeItem, clearCart}) => (
    <Wrapper>

        {!amount
            ? <EmptyWarning>
                <Line>Your cart is empty.</Line>
                <Line>If you take the union of your cart and the null set, you get your cart again.</Line>
                <Line>Your cart has a closed form under addition, so why not head over to the Store and put something in it.</Line>
            </EmptyWarning>
            : <div>

                {/*<button onClick={clearCart}>Clear</button>*/}
                <Title>Cart</Title>
                <Amount>{amount} items</Amount>
                {cartList.map(item => <CartItem {...item}
                                                changeQuantity={changeQuantity}
                                                removeItem={removeItem}
                                                key={item.id}

                />)}
                <SubTotal>
                    <Row>
                        <div>Subtotal</div>
                        <div>${cartList.reduce((sum, item) => sum + (item.price*item.quantity), 0).toFixed(2) }</div>
                    </Row>
                    <Row>
                        <div>Shipping [select]</div>
                        <div>${(4).toFixed(2)}</div>
                    </Row>
                </SubTotal>
                <Total>
                    <Row>
                        <div>Total</div>
                        <div>${(cartList.reduce((sum, item) => sum + (item.price*item.quantity), 0)+ (4)).toFixed(2)}</div>
                    </Row>
                </Total>
                <CheckOutBtn>Continue to Checkout</CheckOutBtn>
            </div>
        }


    </Wrapper>
)
export default CartList

const CheckOutBtn = styled.button`
    line-height: 48px;
    background: #f0d943;
    border-radius: 4px;
    font-size: 16px;
    color: #575959;
    letter-spacing: 0;
    display: block;
    height: 48px;
    text-align: center;
    text-decoration: none;
    width: 100%;
    border: 0;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0px;
    font-size: 15px;
`
const SubTotal = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors.light}
`
const Total = styled.div``
const Wrapper = styled.div`
    margin-top: 80px;
    margin-bottom: 40px;
    
    color: ${props => props.theme.colors.dark}
`
const Title = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
`
const Amount = styled.div`
    font-size: 14px;
`
const Line = styled.p `

`
const EmptyWarning = styled.div`
    text-align: center;  
    margin: 50px 0px;
`