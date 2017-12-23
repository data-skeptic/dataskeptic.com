import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'
import BlogUpdater from './BlogUpdater'

class CMS extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			mode: props.mode
		}
	}

	componentDidMount() {
		var dispatch = this.props.dispatch
		if (this.state.mode == 'pending') {
		    dispatch({type: "CMS_LOAD_PENDING_BLOGS", payload: {dispatch} })
		} else {
		    dispatch({type: "CMS_LOAD_RECENT_BLOGS", payload: {dispatch} })
		}
	}

	render() {
		var oadmin = this.props.admin.toJS()
		var mode = this.state.mode
		var dispatch = this.props.dispatch
		var blogs = []
		if (mode == 'pending') {
			blogs = oadmin['pending_blogs'] || []			
		} else if (mode == 'recent') {
			blogs = oadmin['recent_blogs'] || []
		}
		return (
				<div>
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
export default connect(state => ({}))(CMS)
