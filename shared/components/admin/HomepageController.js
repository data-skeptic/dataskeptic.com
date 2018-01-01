import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'

class HomepageController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"tmp_blog_id": 0
		}
	}

	componentDidMount() {
	}

	update(me, title, event) {
		var s = me.state
		var val = event.target.value
    	me.setState({"tmp_blog_id": val});
	}

	save(blog_id, dispatch) {
		var blog_id = this.state.tmp_blog_id
		console.log(blog_id)
	    dispatch({type: "CMS_SET_HOMEPAGE_FEATURE", payload: {blog_id} })
	}

	render() {
		var dispatch = this.props.dispatch
		var ocms = this.props.cms.toJS()
		var blog_id = 0
		if ('featured_blog' in ocms) {
			var featured_blog = ocms['featured_blog']
			if (featured_blog) {
				blog_id = featured_blog['blog_id']
			} else {
				blog_id = -1
			}
		}
		var tmp_blog_id = this.state.tmp_blog_id
		if (tmp_blog_id != 0 && tmp_blog_id != blog_id) {
			blog_id = tmp_blog_id
		}
		if (blog_id == 0 || blog_id == undefined) {
			return <div className="center">Loading</div>
		}

		var me = this
		return (
			<div>
				<h3>Feature of the week</h3>
				<div className="row">
					<div classname="col-xs-12 col-sm-2">blog_id:</div>
					<div classname="col-xs-6 col-sm-5"><input onChange={this.update.bind(this, me, "blog_id")} value={blog_id} /></div>
					<div classname="col-xs-6 col-sm-5"><button onClick={this.save.bind(this, blog_id, dispatch)}>Update</button></div>
				</div>
			</div>
		)
	}
}
export default connect(state => ({
	cms: state.cms
}))(HomepageController)

