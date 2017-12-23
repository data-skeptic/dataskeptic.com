import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'

class HomepageController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blog_id: 0
		}
	}

	componentDidMount() {
	}

	update(me, title, event) {
		console.log(event)
		console.log(event.target)
		console.log(event.target.value)
		var s = me.state
		s[title] = event.target.value
    	me.setState(s);
	}

	save(blog_id, dispatch) {
	    dispatch({type: "CMS_SET_HOMEPAGE_FEATURE", payload: {blog_id} })
	}

	render() {
		var dispatch = this.props.dispatch
		var blog_id = this.state.blog_id
		var me = this
		return (
			<div>
				<h3>Feature of the week</h3>
				blog_id:
				<input onChange={this.update.bind(this, me, "blog_id")} value={blog_id} />
				<button onClick={this.save.bind(this, blog_id, dispatch)}>Update</button>
			</div>
		)
	}
}
export default connect(state => ({}))(HomepageController)

