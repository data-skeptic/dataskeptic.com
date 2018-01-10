import React from "react"
import ReactDOM from "react-dom"
import querystring from 'querystring'
import { connect } from 'react-redux'

class HomepageController extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	update(me, title, event) {
		var dispatch = me.props.dispatch
		var target = event.target
		var f = target.id
		var val = target.value
	    dispatch({type: "CMS_UPDATE_HOMEPAGE_FEATURE", payload: {f, val} })
	}

	save(dispatch) {
	    dispatch({type: "CMS_SET_HOMEPAGE_FEATURE", payload: {} })
	}

	render() {
		var dispatch = this.props.dispatch
		var ocms = this.props.cms.toJS()
		console.log(ocms)
		var featured_blog = ocms['featured_blog']
		var featured_blog2 = ocms['featured_blog2']
		var featured_blog3 = ocms['featured_blog3']
		var blog_id  = -1
		var blog_id2 = -1
		var blog_id3 = -1
		if (featured_blog) {
			blog_id = featured_blog['blog_id']
		} else {
			blog_id = -1
		}
		if (featured_blog2) {
			blog_id2 = featured_blog2['blog_id']
		} else {
			blog_id2 = -1
		}
		if (featured_blog3) {
			blog_id3 = featured_blog3['blog_id']
		} else {
			blog_id3 = -1
		}
		if (blog_id == 0 || blog_id == undefined) {
			return <div className="center">Loading</div>
		}

		var me = this
		return (
			<div>
				<h3>Homepage content</h3>
				<div className="row">
					<div classname="col-xs-12 col-sm-2">Feature of the week blog_id:</div>
					<div classname="col-xs-6 col-sm-5"><input id="featured_blog" onChange={this.update.bind(this, me, "X")} value={blog_id} /></div>
					<div classname="col-xs-12 col-sm-2">2nd position blog_id:</div>
					<div classname="col-xs-6 col-sm-5"><input id="featured_blog2" onChange={this.update.bind(this, me, "X")} value={blog_id2} /></div>
					<div classname="col-xs-12 col-sm-2">3rd position blog_id:</div>
					<div classname="col-xs-6 col-sm-5"><input id="featured_blog3" onChange={this.update.bind(this, me, "X")} value={blog_id3} /></div>
					<div classname="col-xs-6 col-sm-5"><button onClick={this.save.bind(this, dispatch)}>Update</button></div>
				</div>
			</div>
		)
	}
}
export default connect(state => ({
	cms: state.cms
}))(HomepageController)

