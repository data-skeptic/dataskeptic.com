import React from "react"
import ReactDOM from "react-dom"
import querystring from 'querystring'
import { connect } from 'react-redux'

class BlogUpdater extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.blog
	}

	update(me, title, event) {
		console.log(event)
		console.log(event.target)
		console.log(event.target.value)
		var s = me.state
		s[title] = event.target.value
    	me.setState(s);
	}

	save(blog_id, title, abstract, author, publish_date, dispatch) {
		console.log("save")
	    dispatch({type: "CMS_UPDATE_BLOG", payload: {blog_id, title, abstract, author, publish_date} })
	}

	componentDidMount() {
	}

	render() {
		var dispatch = this.props.dispatch
		var blog = this.state
		var blog_id = blog["blog_id"]
		var title = blog["title"]
		var abstract = blog["abstract"]
		var author = blog["author"]
		var publish_date = blog["publish_date"]
		var me = this
		return (
			<tr>
				<td>{blog_id}</td>
				<td><input onChange={this.update.bind(this, me, "title")} value={title} /></td>
				<td><input onChange={this.update.bind(this, me, "abstract")} value={abstract} /></td>
				<td><input onChange={this.update.bind(this, me, "author")} value={author} /></td>
				<td><input onChange={this.update.bind(this, me, "publish_date")} value={publish_date}/></td>
				<td><button onClick={this.save.bind(this, blog_id, title, abstract, author, publish_date, dispatch)}>Save</button></td>
			</tr>
		)
	}
}
export default connect(state => ({}))(BlogUpdater)

