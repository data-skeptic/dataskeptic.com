import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

class RelatedContent extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {items} = this.props;
		if (items.length == 0) {
			return <div></div>
		}
		return (
			<div>
			<h2>Related Content</h2>
			{items.map(function(item) {
				var desc = item.desc
				var title = item.title
				var uri = item.uri
				return (
					<div className="related-content">
						<a href={uri}>{title}</a> - {desc}
					</div>
					)
			})}
			</div>
		)
	}
}
export default RelatedContent;
