import React, {Component} from 'react'
import styled from 'styled-components'
import ActiveLink from './ActiveLink'
import Link from './Link'
import Ionicon from 'react-ionicons'
import {connect} from 'react-redux'
import {
    getCartAmount,
    sync,
    getLoaded
} from "../redux/modules/shopReducer";

@connect(
    state => ({
        loaded: getLoaded(state),
        amount: getCartAmount(state),
    }),
    {sync}
)
export default class Header extends Component {

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.sync()
        }
    }

    render() {
        const {amount} = this.props;
        return (
            <HeaderWrapper>
                <Logo href="/">
                    <img src="/static/logo.svg" alt="DataSkeptic"/>
                </Logo>
                <Navs>
                    <ActiveLink href="/podcasts">Podcasts</ActiveLink>
                    <ActiveLink href="/blog">Blog</ActiveLink>
                    <ActiveLink href="/projects">Projects</ActiveLink>
                    <ActiveLink href="/services">Services</ActiveLink>
                    <ActiveLink href="/about">About</ActiveLink>
                </Navs>
                <Navs>
                    <ActiveLink href="/members">Membership</ActiveLink>
                    <ActiveLink href="/store">Store</ActiveLink>
                    <Cart>
                        <Icon>
                            <Ionicon icon={amount > 0 ? 'ios-cart' : 'ios-cart-outline'} fontSize="32px" color="#fff"/>
                            {amount !== 0 && <Number>{amount}</Number>}
                        </Icon>
                    </Cart>
                    <Profile href="/account">
                        <Icon>
                            <Ionicon icon="ios-person" fontSize="32px" color="#fff"/>
                        </Icon>
                    </Profile>
                </Navs>
            </HeaderWrapper>
        )
    }
}


const Navs = styled.div`
    height: 100%;
    display: flex;
`

const Cart = styled.div`
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.darker};
`

const Profile = styled(Link)`
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #000;
    background-color: ${props => props.theme.colors.darker};
`

const Icon = styled.div`
    position: relative;
    & > svg {
        right: -6px;
        top: -6px;
    }
`

const Number = styled.div`
    text-align: center;
    position: absolute;
    right: -4px;
    top: -2px;
    color: white;
    background-color: #f0d943;
    width: 18px;
    height: 18px;
    font-size: 13px;
    color: black;
    border-radius: 100%;
`

const Logo = styled(Link)`
    display: block;
    margin-left:40px;
`

const HeaderWrapper = styled.div`
    background-color: ${props => props.theme.colors.dark};
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`



