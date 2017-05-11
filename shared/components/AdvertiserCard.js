import React from "react"
import ReactDOM from "react-dom"
import sha1 from 'sha1';

export default class AdvertiserCard extends React.Component {
	constructor(props) {
		super(props)
	}

	getContentHash() {
		return sha1(this.props.content);
	}
	
	render() {
		const hash = this.getContentHash();

		return (
			<div className="advertiser-card">
				<div className="row">
					<div className="col-xs-12">
						<div key={hash} dangerouslySetInnerHTML={{__html: this.props.content}}/>
					</div>
				</div>
			</div>
		)
	}
}
