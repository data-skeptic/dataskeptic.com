import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactDisqusComments from 'react-disqus-comments'

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

    handleNewComment(comment) {
        console.log(comment.text);
    }

	render() {
		var oepisodes = this.props.episodes.toJS()
		var oblogs = this.props.blogs.toJS()
		var osite = this.props.site.toJS()
		var disqus_username = osite.disqus_username
		var blog_focus = oblogs.blog_focus
		var title = this.props.title
		var content = blog_focus.content || "Loading...."
		if (content == "") {
			content = "Loading....."
		}
		
		var uid = 'http://dataskeptic.com/blog' + this.props.pathname
		
		return (
			<div className="center">
				<span dangerouslySetInnerHTML={{__html: content}} />
				<MailingListBlogFooter />
	            <ReactDisqusComments
	                shortname={disqus_username}
	                identifier={uid}
	                title={title}
	                url={uid}
	                onNewComment={this.handleNewComment}/>
			</div>
		)
	}
}
export default connect(state => ({ site: state.site, episodes: state.episodes, blogs: state.blogs }))(BlogItem)

