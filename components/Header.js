import styled from 'styled-components'
import React, { Component } from 'react'
import ActiveLink from './ActiveLink'
import Link from './Link'
import { connect } from 'react-redux'
import { getCartAmount } from '../redux/modules/shopReducer'

@connect(
  state => ({
    amount: getCartAmount(state)
  }),
  {}
)
export default class Header extends Component {
  render() {
    const { amount } = this.props
    return (
      <HeaderWrapper>
        <Logo href="/">
          <img src="/static/logo.svg" alt="DataSkeptic" />
        </Logo>
        <Navs>
          <ActiveLink href="/podcasts">Podcast</ActiveLink>
          <ActiveLink href="/blog">Blogs</ActiveLink>
          <ActiveLink href="/projects">Projects</ActiveLink>
          <ActiveLink href="/services">Services</ActiveLink>
        </Navs>
        <Navs>
          <ActiveLink href="/members"> Members </ActiveLink>
          <ActiveLink href="/store"> Store </ActiveLink>
          <Cart>
            <Icon>
              <img src="/static/icon-cart.svg" />
              {amount !== 0 && <Number>{amount}</Number>}
            </Icon>
          </Cart>
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
const Icon = styled.div`
  position: relative;
  & > img {
    width: 24px;
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
  background-color: yellow;
  min-width: 14px;
  min-height: 14px;
  font-size: 13px;
  color: black;
  border-radius: 15px;
`
const Logo = styled(Link)`
  display: block;
  margin-left: 40px;
`

const HeaderWrapper = styled.div`
  background-color: ${props => props.theme.colors.dark};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`
