import React from "react"
import AdSense from 'react-adsense'
import ReactDOM from "react-dom"

export default class Footer extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				<div className="footer">
				{this.props.foo}
					<a className="footer-links" href="https://itunes.apple.com/us/podcast/the-data-skeptic-podcast/id890348705"><img src="/img/png/itunes.png" className="footer-img" alt="Data Science itunes" /></a>
					<a className="footer-links" href="https://goo.gl/app/playmusic?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t%3DData_Skeptic"><img src="/img/png/google-play.png" className="footer-img" alt="Data Science google play" /></a>
					<a className="footer-links" href="http://www.stitcher.com/s?fid=50561&amp;refid=stpr"><img src="/img/jpg/stitcher.jpg" alt="Data Science Stitcher" className="footer-img"  /></a>
					<a className="footer-links" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img src="/img/png/by-nc-sa.eu.png" className="footer-img" alt="Data Skeptic is released under a creative commons attribution non-comercial share alike 4.0 license" /></a>
					<a className="footer-links" href="http://dataskeptic.com/feed.rss"><img src="/img/gif/rss2.gif" alt="Data Skeptic podcast episode rss feed" /></a>
				</div>
				<div>
			        <AdSense.Google client='ca-pub-4495792015968395'
		                slot='2320193863' />
				</div>
			</div>
		)
	}
}
