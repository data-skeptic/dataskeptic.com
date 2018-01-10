import React from "react"
import ReactDOM from "react-dom"
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
		var cn = "cms-" + mode
		return (
				<div className={cn}>
					<h3>CMS {mode}</h3>
					<div>
					{
						blogs.map((blog) => {
							return (
								<BlogUpdater blog={blog} />
							)
						})
					}
					</div>
				</div>
		)
	}
}
export default connect(state => ({
	cms: state.cms,
}))(CMS)
