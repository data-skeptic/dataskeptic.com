import React, {Component} from 'react'
import styled from 'styled-components'
import {connect } from 'react-redux'
import {addToCart, getMemberships} from "../../../redux/modules/shopReducer";
import {media} from "../../styles";

const Paypal = (value) =>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value={value} />
        <PaypalButton type="submit" value="Subscribe with Paypal" />
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
    </form>

const MemberCard = ({membership, add}) =>
    <Card>
        <Title>{membership.title}</Title>
        <Description>{membership.desc}</Description>
        <Price>${membership.price}{' '}/{' '}month</Price>

        <Buttons>
            <AddToCart onClick={() => add(membership)}>Add to Cart</AddToCart>
            or
            <Paypal value={membership.paypal}/>
        </Buttons>
    </Card>

@connect((state) => ({
    list: getMemberships(state)
}), {addToCart})
export default class Memberships extends Component {

    addToCart = item => this.props.addToCart(item)

    render() {
        const { list } = this.props

        return (
            <Wrapper>
                {list && list.map(membership => <MemberCard key={membership.id} membership={membership} add={this.addToCart}/>)}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;

    ${media.phone`
        flex-direction: column;
    `};
`

const Card = styled.div`
    flex:0 0 28%;
    padding: 10px;
    border-radius: 5px;
    margin: 20px;
    background: #fafafa;
    border: 1px solid #d7d9d9;
    background-color: ${props => props.color}
`

const Title = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 26px;
`

const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    min-height: 80px;
`

const Price = styled.div`
    text-align: center;
    margin-bottom: 10px;
    
    font-size: 22px;
    font-weight: bold;
    color: #575959;
`

const Buttons = styled.div`
    display: flex;
        flex-direction: column;
    align-items: center;
`

const AddToCart = styled.button`
    margin: 0 auto;
    line-height: 48px;
    background: #F0D943;
    border-radius: 4px;
    font-size: 18px;
    color: #575959;
    display: block;
    height: 48px;
    text-align: center;
    text-decoration: none;
    width: 100%;
    border: 0px;
    cursor: pointer;
`

const PaypalButton = styled.input`
    font-weight: bold;
    margin: 0 auto;
    line-height: 30px;
    background: #3A85D0;
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
    display: block;
    height: 32px;
    text-align: center;
    text-decoration: none;
    width: 100%;
    border: 0px;
    cursor: pointer;
`