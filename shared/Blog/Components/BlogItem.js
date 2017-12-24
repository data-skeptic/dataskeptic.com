import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactDisqusComments from 'react-disqus-comments'
import snserror from '../../SnsUtil'
import LatestEpisodePlayer from "../Containers/LatestEpisodePlayer"
import MailingListBlogFooter from "./MailingListBlogFooter"
import BlogLink from './BlogLink'

class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		var title = this.props.title
		var dispatch = this.props.dispatch
		var pathname = this.props.pathname
		setTimeout(function() {
		    dispatch({type: "SET_TITLE", payload: title })
		}, 10)
	}

    handleNewComment(comment) {
        console.log(comment.text)
		snserror("Blog comment", comment.text, "ds-newblog")
	}

	render() {
        console.log("render here")
		var osite = this.props.site.toJS()
		var oepisodes = this.props.episodes.toJS()
		var disqus_username = osite.disqus_username
		var blog = this.props.blog
		var oblogs = this.props.blogs.toJS()
		var prettyname = blog.prettyname
		var content = oblogs.content_map[prettyname]
		var url = 'http://dataskeptic.com/blog' + blog.prettyname
		var title = blog['title']
		var top = <div></div>
		var bot = <div></div>
		var guid = blog.guid
		if (guid) {
			top = (
				<LatestEpisodePlayer guid={guid} />
			)				
		}
		return (
			<div className="center">
				{top}
				<span dangerouslySetInnerHTML={{__html: content}} />
				{bot}
				<MailingListBlogFooter />
	            <ReactDisqusComments
	                shortname={disqus_username}
	                identifier={url}
	                title={title}
	                url={url}
	                onNewComment={this.handleNewComment}/>
			</div>
		)
	}
}
export default connect(state => ({ site: state.site, episodes: state.episodes, blogs: state.blogs }))(BlogItem)

