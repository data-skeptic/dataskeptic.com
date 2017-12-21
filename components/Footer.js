import React from 'react'
import styled from 'styled-components'
import AdSense from 'react-adsense'
import Link from './Link'
import {media} from "../modules/styles";

const LINKS = {
    ITUNES: 'https://itunes.apple.com/podcast/the-data-skeptic-podcast/id890348705',
    GOOGLE: 'https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t=Data_Skeptic',
    STITCHER: 'http://www.stitcher.com/s?fid=50561&amp;refid=stpr',
    RSS: '/api/blog/rss',

    TWITTER: 'https://twitter.com/dataskeptic',
    FACEBOOK: 'https://www.facebook.com/dataskeptic',
    YOUTUBE: 'https://youtube.com/dataskeptic'
};

const Footer = () => (
    <Container>
        {/*{process.browser && <AdSense.Google client='ca-pub-4495792015968395' slot='2320193863'/>}*/}

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
                        <Item><Link href={LINKS.TWITTER}>Twitter</Link></Item>
                        <Item><Link href={LINKS.FACEBOOK}>Facebook</Link></Item>
                        <Item><Link href={LINKS.YOUTUBE}>Youtube</Link></Item>
                    </Links>
                </NavSection>
                <NavSection>
                    <SectionTitle>Subscribe</SectionTitle>
                    <Links>
                        <Item>
                            <Link href={LINKS.ITUNES}>iTunes</Link>
                        </Item>
                        <Item>
                            <Link href={LINKS.GOOGLE}>Google Play</Link>
                        </Item>
                        <Item>
                            <Link href={LINKS.STITCHER}>Stitcher</Link>
                        </Item>
                        <Item><Link href={LINKS.RSS}>RSS Feed</Link></Item>
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
    
    ${media.phone`
        flex-direction: column;
        padding: 20px 5px;
    `};
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
   
   ${media.phone`
      justify-content: space-around;
      flex-wrap: wrap;
   `};
`

const NavSection = styled.div`
    flex: 0 0 20%;
    flex-wrap: wrap;
    
    ${media.phone`
       padding-top: 10px; 
       flex: 0 0 50%;
   `};
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