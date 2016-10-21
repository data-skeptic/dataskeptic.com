import React from "react"
import ReactDOM from "react-dom"

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				<img src="/img/svg/data-skeptic-logo.svg" alt="Data Skeptic logo" />
				<div>
					<a href="https://itunes.apple.com/us/podcast/the-data-skeptic-podcast/id890348705"><img src="http://dataskeptic.com/itunes.png" height="35" alt="Data Science itunes" /></a>
					<a href="https://goo.gl/app/playmusic?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t%3DData_Skeptic"><img src="http://dataskeptic.com/google-play.png" height="35" alt="Data Science google play" /></a>
					<a href="http://www.stitcher.com/s?fid=50561&amp;refid=stpr"><img src="http://dataskeptic.com/stitcher_234x60.jpg" alt="Data Science Stitcher" height="35" /></a>
					<a href="http://dataskeptic.com/feed.rss"><img src="http://dataskeptic.com/rss2.gif" alt="Data Skeptic podcast episode rss feed" /></a>
				</div>
			</div>
		)
	}
}
