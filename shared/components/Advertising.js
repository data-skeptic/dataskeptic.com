import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Advertising extends Component {
	render() {
		return (
			<div className="center">
				<h2>Advertising with Data Skeptic</h2>
				<p>Data Skeptic consistently ranks in the top position for data science related podcasts on platforms like iTunes and Stitcher.  We reach a large portion of practicing data scientists on a weekly basis.</p>
				<p>We can help you get you craft and delivery a message about your product or service to your highly targeted audience.  We can do this through a variety of ad types offered.</p>

				<h3>Interview style ads</h3>
				<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/311032382&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>

				<h3>Feature highlight ads</h3>
				<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/311032627&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
				
				<div className="row coaching-end-box">
					<div className="col-xs-12 col-sm-5 coaching-left">
						<img src="/img/png/kyle-polich.png" />
						<div className="coach-caption">
							<p><span className="coaching-name">Kyle Polich</span></p>
							<p><span className="coaching-title">Data Skeptic, Executive Producer</span></p>
						</div>
					</div>
					<div className="col-xs-12 col-sm-7 coaching-right">
						<h2>Let's get started</h2>
						<p>For updated pricing, contact <a href="mailto:advertising@dataskeptic.com">advertising@dataskeptic.com</a>.</p>
						<p>If you would like to have a conversation about how we can get your message to the Data Skeptic audience, feel free to schedule time with me via the button below.</p>
						<div className="book-me"><a className="book-me-link" href="https://calendly.com/polich">
							<span className="book-me-1">Book me on </span>
							<span className="book-me-2">calendly.com/polich</span>
						</a></div>
					</div>
				</div>
				<div className="clear" />
			</div>
		)
	}
}

export default connect(state => ({ products: state.products }))(Advertising)
