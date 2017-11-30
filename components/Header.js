import styled from 'styled-components'
import React from 'react'
import ActiveLink from './ActiveLink'
import Link from './Link'
export default (props) => (
    <HeaderWrapper>
        <Logo href="/">
            <img src="/static/logo.svg" alt="DataSkeptic"/>
        </Logo>
        <Navs>
            <ActiveLink href="/podcasts">Podcast</ActiveLink>
            <ActiveLink href="/blog">Blog</ActiveLink>
            <ActiveLink href="">Projects</ActiveLink>
            <ActiveLink href="">Services</ActiveLink>
            <ActiveLink href="">About</ActiveLink>
        </Navs>
        <Navs>
            <Link href="/members"> Sponsor </Link>
            <Link href="/store"> Store </Link>
            <Cart>
                <Icon/>
                <Number>2</Number>
            </Cart>
        </Navs>
    </HeaderWrapper>
)


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

`
const Number = styled.div`
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