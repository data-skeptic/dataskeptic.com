import styled from 'styled-components'
import React from 'react'
import Link from './Link'

export default (props) => (
    <HeaderWrapper>
        <Logo href="/">
            <img src="/static/logo.svg" alt="DataSkeptic"/>
        </Logo>
        <Navs>
            <Link href="/podcasts">Podcast</Link>
            <Link href="/blog">Blog</Link>
            <Link href="">Projects</Link>
            <Link href="">Services</Link>
            <Link href="">About</Link>
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
    & > a {
        text-decoration:none;
        color: ${props => props.theme.colors.link};
        padding: 30px 0px;
        border-bottom: 2px solid ${props => props.theme.colors.primary};
        box-sizing: content-box;
        margin-right: 40px;
    }
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