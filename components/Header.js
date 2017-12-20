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
import {media} from "../modules/styles";

const preventScroll = () => {
    console.dir(`preventScroll`)
}

const turnScroll = () => {
    console.dir(`turnScroll`)
}


@connect(
    state => ({
        loaded: getLoaded(state),
        amount: getCartAmount(state),
    }),
    {sync}
)
export default class Header extends Component {

    constructor() {
        super()

        this.state = {
            showNav: false
        }
    }

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.sync()
        }
    }

    toggleNav = () => {
        this.setState({showNav: !this.state.showNav})

        if (!this.state.showNav) {
            preventScroll()
        } else {
            turnScroll()
        }
    }

    navClick = (e, module) => {
        window.scrollTo(0, 0)
        this.setState({showNav: false})
    }

    showCart = () => this.props.showCart()

    render() {
        const {amount} = this.props;
        const {showNav} = this.state
        return (
            <HeaderWrapper>
                <NormalWrapper>
                    <Logo href="/">
                        <img src="/static/logo.svg" alt="DataSkeptic"/>
                    </Logo>
                    <Navs>
                        <ActiveLink href="/podcasts" onClick={(e) => this.navClick(e, `podcasts`)}>Podcasts</ActiveLink>
                        <ActiveLink href="/blog" onClick={(e) => this.navClick(e, `blog`)}>Blog</ActiveLink>
                        <ActiveLink href="/projects" onClick={(e) => this.navClick(e, `projects`)}>Projects</ActiveLink>
                        <ActiveLink href="/services" onClick={(e) => this.navClick(e, `services`)}>Services</ActiveLink>
                        <ActiveLink href="/about" onClick={(e) => this.navClick(e, `about`)}>About</ActiveLink>
                    </Navs>
                    <Navs>
                        <ActiveLink href="/members" onClick={(e) => this.navClick(e, `members`)}>Membership</ActiveLink>
                        <ActiveLink href="/store" onClick={(e) => this.navClick(e, `store`)}>Store</ActiveLink>
                        <Cart onClick={this.showCart}>
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
                </NormalWrapper>
                <MobileWrapper>
                    <Navs>
                        <Button onClick={this.toggleNav}>
                            <Icon>
                                <Ionicon icon={showNav ? 'md-close' : 'md-menu'} fontSize="32px" color="#fff"/>
                            </Icon>
                        </Button>
                    </Navs>
                    <Logo href="/">
                        <img src="/static/logo-min.svg" alt="DataSkeptic"/>
                    </Logo>
                    <Navs>
                        <Profile href="/account">
                            <Icon>
                                <Ionicon icon="ios-person" fontSize="32px" color="#fff"/>
                                {amount !== 0 && <Number>{amount}</Number>}
                            </Icon>
                        </Profile>
                    </Navs>
                </MobileWrapper>

                {showNav &&
                    <MobileNav>
                        <MobileLink href="/"  onClick={(e) => this.navClick(e, `home`)}>Home</MobileLink>
                        <MobileLink href="/podcasts"  onClick={(e) => this.navClick(e, `podcasts`)}>Podcasts</MobileLink>
                        <MobileLink href="/blog"  onClick={(e) => this.navClick(e, `blog`)}>Blog</MobileLink>
                        <MobileLink href="/projects"  onClick={(e) => this.navClick(e, `projects`)}>Projects</MobileLink>
                        <MobileLink href="/services"  onClick={(e) => this.navClick(e, `services`)}>Services</MobileLink>
                        <MobileLink href="/about"  onClick={(e) => this.navClick(e, `about`)}>About</MobileLink>
                        <MobileLink href="/members"  onClick={(e) => this.navClick(e, `members`)}>Membership</MobileLink>
                        <MobileLink href="/store"  onClick={(e) => this.navClick(e, `store`)}>Store</MobileLink>
                    </MobileNav>
                }
            </HeaderWrapper>
        )
    }
}

const HeaderWrapper = styled.div`
    background-color: ${props => props.theme.colors.dark};
    height: 80px;
`

const NormalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  
    ${media.phone`
        display: none;
    `};
`

const MobileWrapper = styled.div`
    display: none;
    align-items: center;
    justify-content: space-between;
    
    ${media.phone`
        display: flex;
    `};
`

const Navs = styled.div`
    height: 100%;
    display: flex;
`

const Button = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #000;
    background-color: ${props => props.theme.colors.darker};
`

const Cart = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.darker};
    cursor: pointer;
`

const Profile = styled(Link)`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #000;
    background-color: ${props => props.theme.colors.darker};
    cursor: pointer;
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
    margin-left: 20px;
    
    ${media.phone`
        margin-left: 0px; 
    `};
`

const MobileNav = styled.div`
    position: fixed;
    top: 80px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #323333;
    z-index: 1;
    transform: translate(0);
    transition: opacity 0.3s, z-index 0.5s;
    padding-top: 40px;
`

const MobileLink = styled(Link)`
    display: block;
    line-height: 50px;
    color: #FFFFFF;
    padding-left: 38px;
    border-left: 2px solid transparent;
    text-decoration: none;
`