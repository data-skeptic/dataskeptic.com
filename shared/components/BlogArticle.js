import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactDisqusComments from 'react-disqus-comments'

import LatestEpisodePlayer from "./LatestEpisodePlayer"
import MailingListBlogFooter from "./MailingListBlogFooter"
import BlogLink from './BlogLink'
import BlogAuthorTop from './BlogAuthorTop'
import BlogAuthorBottom from './BlogAuthorBottom'
import Loading from './Loading'

class BlogArticle extends React.Component {
	constructor(props) {
		super(props)
		var title = this.props.title
		var dispatch = this.props.dispatch
		var pathname = this.props.pathname
		setTimeout(function() {
		    dispatch({type: "SET_TITLE", payload: title })
		}, 10)
	}

	componentDidMount() {
		var pathname = location.pathname
		var key = "/blog"
		var pn = pathname.substring(key.length, pathname.length)
		var dispatch = this.props.dispatch
		dispatch({type: "LOAD_BLOG_AND_CONTENT", payload: {pathname: pn, dispatch} })
	}


    handleNewComment(comment) {
    	// TODO: Maybe use a cognitive service here?
        console.log(comment.text);
    }

	render() {
		var oepisodes = this.props.episodes.toJS()
		var oblogs = this.props.blogs.toJS()
		var osite = this.props.site.toJS()
		var disqus_username = osite.disqus_username
		var blog_focus = oblogs.blog_focus
		var title = this.props.title
		var isEpisode = false

		if (blog_focus == undefined || blog_focus.blog == undefined) {
			return <Loading />
		}
		var pn = blog_focus.blog.prettyname
		var showBio = true
		if (pn.indexOf('/episodes/')==0 || pn.indexOf('/transcripts/')==0) {
			showBio = false
		}
		var top = <div></div>
		if (blog_focus.blog != undefined && blog_focus.blog.guid != undefined) {
			var ep = oepisodes.episodes_map[blog_focus.blog.guid]
			try {
				top = (
					<div className="home-player">
						<LatestEpisodePlayer guid={blog_focus.blog.guid} />
					</div>
				)
				isEpisode = true					
			}
			catch (err) {
				console.log(err)
				top = <div></div>
			}
		}
		var bot = <div></div>
		if (isEpisode) {
			var tm = oblogs.transcript_map
			if (tm != undefined) {
				var guid = blog_focus.blog.guid
				var b = tm[guid]
				if (b != undefined) {
					if (b.prettyname.indexOf('/transcripts/') == -1) {
						var pn = "/blog" + b.prettyname
						bot = (
							<div className='blog-transcript-link'>
								Read the full transcript here:
								<Link to={pn}>{title} transcripts</Link>.
							</div>
						)
					}
				}
			}
		}
		var content = blog_focus.content || ""
		if (content == "") {
			if (blog_focus.blog != undefined) {
				var title = blog_focus.blog.title
				content = "<h2>" + title + "</h2><p>Loading...</p>"
			} else {
				content = "<p>Loading....</p>"
			}
		}

		var uid = 'http://dataskeptic.com/blog' + blog_focus.blog.prettyname
		var author = ""
		if (blog_focus != undefined && showBio) {
			var blog = blog_focus.blog
			if (blog != undefined) {
				if (blog.author == undefined) {
					author = ""
				} else {
					author = blog.author.toLowerCase()					
				}
			}
		}
		return (
			<div className="center">
				{top}
				<BlogAuthorTop author={author} />
				<span dangerouslySetInnerHTML={{__html: content}} />
				{bot}
				<BlogAuthorBottom author={author} />
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
export default connect(state => ({ site: state.site, episodes: state.episodes, blogs: state.blogs }))(BlogArticle)
