import React from "react"
import AdSense from 'react-adsense'
import { Link } from 'react-router'
import ReactDOM from "react-dom"
import sha1 from 'sha1';

import NavLink from '../../../components/NavLink'

const LINKS = {
	ITUNES: 'https://itunes.apple.com/podcast/the-data-skeptic-podcast/id890348705',
	GOOGLE: 'https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t=Data_Skeptic',
	STITCHER: 'http://www.stitcher.com/s?fid=50561&amp;refid=stpr',
	RSS: '/api/blog/rss',

	TWITTER: 'https://twitter.com/dataskeptic',
	FACEBOOK: 'https://www.facebook.com/dataskeptic',
	YOUTUBE: 'https://youtube.com/dataskeptic'
};

export const Footer = ({showAds = true, foo, pathname, linkClick, banner=null }) =>  (
	<div>
        <div className="advert center">
			{showAds && (banner
                ? <div key={sha1(banner)} dangerouslySetInnerHTML={{__html: banner}}/>
                : <AdSense.Google client='ca-pub-4495792015968395' slot='2320193863'/>
			)}
		</div>

		<div className="footer">
			<div className="container">
				<div className="col-xs-12 col-sm-12 col-md-3">
					<Link to="/" className="logo_footer"><img src="/img/svg/logo.svg" alt="Data Skeptic logo" /></Link>
					<p className="philosophy">
						Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.
					</p>
					<a className="creative-commons" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img src="/img/png/by-nc-sa.eu.png" className="footer-img" alt="Data Skeptic is released under a creative commons attribution non-comercial share alike 4.0 license" /></a>
				</div>
				<div className="col-xs-6 col-sm-3 col-md-offset-1 col-md-2 links-block">
					<h3>Content</h3>
					<div className="links">
						<NavLink active={pathname} to="/podcast" onClick={linkClick}>Podcasts</NavLink>
						<NavLink active={pathname} to="/blog" onClick={linkClick}>Blog</NavLink>
						<NavLink active={pathname} to="/projects" onClick={linkClick}>Projects</NavLink>
						<NavLink active={pathname} to="/services" onClick={linkClick}>Services</NavLink>
					</div>
				</div>
				<div className="col-xs-6 col-sm-3 col-md-2 links-block">
					<h3>Data Skeptic</h3>
					<div className="links">
						<NavLink active={pathname} to="/about" onClick={linkClick}>About</NavLink>
						<NavLink active={pathname} to="/members" onClick={linkClick}>Membership</NavLink>
						<NavLink active={pathname} to="/store" onClick={linkClick}>Store</NavLink>
						<NavLink active={pathname} to="/contact-us" onClick={linkClick}>Contact</NavLink>
					</div>
				</div>
				<div className="col-xs-6 col-sm-3 col-md-2 links-block">
					<h3>Connect</h3>
					<div className="links">
						<a className='twitter' href={LINKS.TWITTER} onClick={linkClick}>Twitter</a>
						<a className='facebook' href={LINKS.FACEBOOK} onClick={linkClick}>Facebook</a>
						<a className='youtube' href={LINKS.YOUTUBE} onClick={linkClick}>Youtube</a>
					</div>
				</div>
				<div className="col-xs-6 col-sm-3 col-md-2 links-block">
					<h3>Subscribe</h3>
					<div className="links">
						<a className='itunes' href={LINKS.ITUNES} onClick={linkClick}>iTunes</a>
						<a className='google_play' href={LINKS.GOOGLE} onClick={linkClick}>Google Play</a>
						<a className='stitcher' href={LINKS.STITCHER} onClick={linkClick}>Stitcher</a>
						<a className='rss' href={LINKS.RSS} onClick={linkClick}>RSS Feed</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Footer