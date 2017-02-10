import React from "react"
import ReactDOM from "react-dom"

export default class AdvertiserCard extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div className="advertiser-card">
				<div className="row">
					<div className="col-xs-12">
					<br/>
						<center><img src="https://s3.amazonaws.com/dataskeptic.com/img-static/data-sci-assn.png" width="100" /></center>
						<br/>
						<p>Thanks to the Data Science Association for sponsoring this week's episode of Data Skeptic.</p>
						<p>Please visit <a href="http://dallasdatascience.eventbrite.com">dallasdatascience.eventbrite.com</a> to learn about their upcoming conference on Saturday February 18th.</p>
					</div>
				</div>
			</div>
		)
	}
}
