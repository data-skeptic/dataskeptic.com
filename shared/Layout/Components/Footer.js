import React from "react"
import AdSense from 'react-adsense'
import { Link } from 'react-router'
import ReactDOM from "react-dom"

import NavLink from '../../components/NavLink'

const LINKS = {
	ITUNES: 'https://itunes.apple.com/us/podcast/the-data-skeptic-podcast/id890348705',
	GOOGLE: 'https://goo.gl/app/playmusic?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t%3DData_Skeptic',
	SWITCHER: 'http://www.stitcher.com/s?fid=50561&amp;refid=stpr',
	RSS: '/feed.rss'
}

export const Footer = ({ foo, pathname, linkClick }) => (
	<div>
		<div className="advert center">
			<AdSense.Google client='ca-pub-4495792015968395' slot='2320193863' />
		</div>
		<div className="footer">
			<div className="container">
				<div className="col-md-3">
					<Link to="/"><img src="/img/svg/logo.svg" alt="Data Skeptic logo" /></Link>
					<p className="philosophy">
						Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.
					</p>
					<a className="creative-commons" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img src="/img/png/by-nc-sa.eu.png" className="footer-img" alt="Data Skeptic is released under a creative commons attribution non-comercial share alike 4.0 license" /></a>
				</div>
				<div className="col-md-offset-1 col-md-2 links-block">
					<h3>Content</h3>
					<div className="links">
						<NavLink active={pathname} to="/podcast" onClick={linkClick}>Podcasts</NavLink>
						<NavLink active={pathname} to="/blog" onClick={linkClick}>Blog</NavLink>
						<NavLink active={pathname} to="/projects" onClick={linkClick}>Projects</NavLink>
						<NavLink active={pathname} to="/services" onClick={linkClick}>Services</NavLink>
					</div>
				</div>
				<div className="col-md-2 links-block">
					<h3>Data Skeptic</h3>
					<div className="links">
						<NavLink active={pathname} to="/podcast" onClick={linkClick}>About</NavLink>
						<NavLink active={pathname} to="/blog" onClick={linkClick}>Sponsor</NavLink>
						<NavLink active={pathname} to="/projects" onClick={linkClick}>Store</NavLink>
						<NavLink active={pathname} to="/services" onClick={linkClick}>Contact</NavLink>
					</div>
				</div>
				<div className="col-md-2 links-block">
					<h3>Connent</h3>
					<div className="links">
						<NavLink className='twitter' active={pathname} to="/podcast" onClick={linkClick}>Twitter</NavLink>
						<NavLink className='facebook' active={pathname} to="/blog" onClick={linkClick}>Facebook</NavLink>
						<NavLink className='youtube' active={pathname} to="/projects" onClick={linkClick}>Youtube</NavLink>
					</div>
				</div>
				<div className="col-md-2 links-block">
					<h3>Subscribe</h3>
					<div className="links">
						<a className='itunes' href={LINKS.ITUNES} onClick={linkClick}>iTunes</a>
						<a className='google_play' href={LINKS.GOOGLE} onClick={linkClick}>Google Play</a>
						<a className='switcher' href={LINKS.SWITCHER} onClick={linkClick}>Switcher</a>
						<a className='rss' href={LINKS.RSS} onClick={linkClick}>RSS Feed</a>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default Footer