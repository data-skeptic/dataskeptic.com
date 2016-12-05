import React from "react"
import ReactDOM from "react-dom"

export default class SocialMediaCard extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div className="home-social-media-card">
				<p>Follow Data Skeptic on <a href="https://twitter.com/dataskeptic">Twitter</a></p>
				<p>Like us on <a href="https://www.facebook.com/dataskeptic">Facebook</a></p>
				<p>Subscribe on <a href="https://www.youtube.com/channel/UC60gRMJRjTuTskBnl-LkPAg">Youtube</a></p>
			</div>
		)
	}
}
