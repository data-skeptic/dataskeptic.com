import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
//import ReactDisqus from 'react-disqus'
//import MathJax from "mathjax"

import MailingListBlogFooter from "./MailingListBlogFooter"

class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		var title = this.props.title
		var dispatch = this.props.dispatch
		var pathname = this.props.pathname

	    dispatch({type: "SET_TITLE", payload: title })
	    dispatch({type: "LOAD_BLOG", payload: {dispatch, pathname} })
	}

	render() {
		var oepisodes = this.props.episodes.toJS()
		var oblogs = this.props.blogs.toJS()
		var blog_focus = oblogs.blog_focus
		var content = blog_focus.content || "Loading...."
		if (content == "") {
			content = "Loading....."
		}
		content = content.split('$').join('$$')
		var uid = 'http://dataskeptic.com/blog' + this.props.pathname

		return (
			<div className="center">
				$$x = 1$$
				<span dangerouslySetInnerHTML={{__html: content}} />
				<MailingListBlogFooter />
			</div>
		)
	}
}
//				<ReactDisqus shortname={osite.disqus_username} identifier={uid} />
export default connect(state => ({ site: state.site, episodes: state.episodes, blogs: state.blogs }))(BlogItem)

