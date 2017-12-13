import React from 'react'
import styled from 'styled-components'
import Link from './Link'

const Footer = () => (
    <FooterWrapper>
        <LogoWrapper>
            <Logo href="/">
                <img src="/static/logo.svg" alt="DataSkeptic"/>
            </Logo>
            <Goals>
                Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.
            </Goals>
        </LogoWrapper>
        <FooterNav>
            <NavSection><SectionTitle>Content</SectionTitle></NavSection>
            <NavSection><SectionTitle>Data Skeptic</SectionTitle></NavSection>
            <NavSection><SectionTitle>Connect</SectionTitle></NavSection>
            <NavSection><SectionTitle>Subscribe</SectionTitle></NavSection>
        </FooterNav>
    </FooterWrapper>
)
export default Footer

const FooterWrapper = styled.footer`
    display: flex;
    background: #3a3b3b;
    color: #a2a6a6;
    padding:60px 100px;    
    margin-top: 20px;
`
const Logo = styled(Link)`
    display: block;   
`
const LogoWrapper = styled.div`
    flex:0 0 15%;
   
`
const Goals = styled.p`
 
`

const FooterNav = styled.nav`
   display: flex;
   flex: 1 0 100%;
`
const NavSection = styled.div`
      flex: 0 0 10%;
`
const SectionTitle = styled.h3`
    font-size: 15px;
    color: #fff;
    padding: 0;
    margin: 0;

`