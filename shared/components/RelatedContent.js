import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

class RelatedContent extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log("related")
		var oblogs = this.props.blogs.toJS()
		var items = oblogs.related || []
		if (items.length == 0) {
			return <div></div>
		}
		return (
			<div>
			<h2>Related Content</h2>
			{items.map(function(item) {
				var desc = item.desc
				var title = item.title
				var uri = item.desc
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
export default connect(state => ({ blogs: state.blogs }))(RelatedContent)
