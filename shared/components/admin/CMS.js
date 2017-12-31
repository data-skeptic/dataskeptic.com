import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'
import BlogUpdater from './BlogUpdater'

class CMS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: props.mode
		}
	}

	componentDidMount() {
		var dispatch = this.props.dispatch
		if (this.state.mode == 'pending') {
		    dispatch({type: "CMS_LOAD_PENDING_BLOGS", payload: {dispatch} })
		} else {
	        var limit = 20
	        var offset = 0
	        var prefix = ''
			var payload = {limit, offset, prefix, dispatch}
		    dispatch({type: "CMS_LOAD_RECENT_BLOGS", payload })
		}
	}

	render() {
		var ocms = this.props.cms.toJS()
		var mode = this.state.mode
		var dispatch = this.props.dispatch
		var blogs = []
		if (mode == 'pending') {
			blogs = ocms['pending_blogs'] || []			
		} else if (mode == 'recent') {
			blogs = ocms['recent_blogs'] || []
		}
		console.log(blogs)
		var cn = "cms-" + mode
		return (
				<div className={cn}>
				<h3>CMS {mode}</h3>
				<table className="cms-table">
					<thead>
						<tr>
							<th>blog_id</th>
							<th>Title</th>
							<th>Abstract</th>
							<th>Author</th>
							<th>Publish Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					{
						blogs.map((blog) => {
							return (
								<BlogUpdater blog={blog} />
							)
						})
					}
					</tbody>
				</table>
				</div>
		)
	}
}
export default connect(state => ({
	cms: state.cms,
}))(CMS)
