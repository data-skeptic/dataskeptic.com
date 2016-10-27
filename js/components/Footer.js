import React from "react"
import ReactDOM from "react-dom"

export default class Footer extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div class="footer">
			{this.props.foo}
				<a class="footer-links" href="https://itunes.apple.com/us/podcast/the-data-skeptic-podcast/id890348705"><img src="http://dataskeptic.com/itunes.png" class="footer-img" alt="Data Science itunes" /></a>
				<a class="footer-links" href="https://goo.gl/app/playmusic?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t%3DData_Skeptic"><img src="http://dataskeptic.com/google-play.png" class="footer-img" alt="Data Science google play" /></a>
				<a class="footer-links" href="http://www.stitcher.com/s?fid=50561&amp;refid=stpr"><img src="http://dataskeptic.com/stitcher_234x60.jpg" alt="Data Science Stitcher" class="footer-img"  /></a>
				<a class="footer-links" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img src="/img/png/by-nc-sa.eu.png" class="footer-img" alt="Data Skeptic is released under a creative commons attribution non-comercial share alike 4.0 license" /></a>
				<a class="footer-links" href="http://dataskeptic.com/feed.rss"><img src="http://dataskeptic.com/rss2.gif" alt="Data Skeptic podcast episode rss feed" /></a>
			</div>
		)
	}
}
