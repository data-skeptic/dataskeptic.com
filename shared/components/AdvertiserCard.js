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
						<center><a href="https://www.periscopedata.com/skeptics"><img src="/blog/episodes/2017/src-data-provenance-and-reproducibility-with-pachyderm/periscope-data.jpg" /></a></center>
						<br/><br/>
						<p>Thanks to Periscope Data for sponsoring this week's episode of Data Skeptic.</p>
						<p>Please visit <a href="https://www.periscopedata.com/skeptics">https://www.periscopedata.com/skeptics</a><br/>
						to learn more about what you can do with their tools.</p>

					</div>
				</div>
			</div>
		)
	}
}
