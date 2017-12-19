import React from 'react'
import styled from 'styled-components'
import AdSense from 'react-adsense'
import Link from './Link'

const Footer = () => (
    <Container>
        <AdSense.Google client='ca-pub-4495792015968395' slot='2320193863'/>

        <FooterWrapper>
            <LogoWrapper>
                <Logo href="/">
                    <img src="/static/logo.svg" alt="DataSkeptic"/>
                </Logo>
                <Goals>
                    Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.
                </Goals>
                <Commons href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                    <img src="/img/png/by-nc-sa.eu.png"
                         alt="Data Skeptic is released under a creative commons attribution non-comercial share alike 4.0 license"/>
                </Commons>
            </LogoWrapper>
            <FooterNav>
                <NavSection>
                    <SectionTitle>Content</SectionTitle>
                    <Links>
                        <Item><Link href="/podcasts">Podcasts</Link></Item>
                        <Item><Link href="/blog">Blog</Link></Item>
                        <Item><Link href="/projects">Projects</Link></Item>
                        <Item><Link href="/services">Services</Link></Item>
                    </Links>
                </NavSection>
                <NavSection>
                    <SectionTitle>Data Skeptic</SectionTitle>
                    <Links>
                        <Item><Link href="/about">About</Link></Item>
                        <Item><Link href="/members">Membership</Link></Item>
                        <Item><Link href="/store">Store</Link></Item>
                        <Item><Link href="/contact">Contact</Link></Item>
                    </Links>
                </NavSection>
                <NavSection>
                    <SectionTitle>Connect</SectionTitle>
                    <Links>
                        <Item><Link href="/about">Twitter</Link></Item>
                        <Item><Link href="/members">Facebook</Link></Item>
                        <Item><Link href="/store">Youtube</Link></Item>
                        <Item><Link href="/contact">Contact</Link></Item>
                    </Links>
                </NavSection>
                <NavSection>
                    <SectionTitle>Subscribe</SectionTitle>
                    <Links>
                        <Item>
                            <Link
                                href="https://itunes.apple.com/us/podcast/the-data-skeptic-podcast/id890348705">iTunes</Link>
                        </Item>
                        <Item>
                            <Link
                                href="https://play.google.com/music/listen?t=Data_Skeptic&view=/ps/Ibr6e2jb7ot6m6gupwdjgsfmoqa">Google
                                Play</Link>
                        </Item>
                        <Item>
                            <Link
                                href="https://www.stitcher.com/podcast/data-skeptic-podcast/the-data-skeptic-podcast?amp;refid=stpr">Stitcher</Link>
                        </Item>
                        <Item><Link href="/rss">RSS Feed</Link></Item>
                    </Links>
                </NavSection>
            </FooterNav>
        </FooterWrapper>
    </Container>
)
export default Footer

const Container = styled.section``

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

const Commons = styled.a`
 
`

const FooterNav = styled.nav`
   display: flex;
   flex: 1;
   justify-content: flex-end;
   width: 100%;
`

const NavSection = styled.div`
    flex: 0 0 20%;
`

const SectionTitle = styled.h3`
    font-size: 15px;
    color: #fff;
    padding: 0;
    margin: 0;
`

const BlockTitle = styled.div``
const Links = styled.div`padding-top: 28px;`
const Item = styled.div`
    >a {
        display: block;
        margin-bottom: 12px;
        color: #A2A6A6;
        text-decoration: none;
    }
`