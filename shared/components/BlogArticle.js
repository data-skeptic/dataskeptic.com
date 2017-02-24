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
import RelatedContent from './RelatedContent'

import {get_folders} from '../utils/redux_loader'
import {get_related_content} from '../utils/redux_loader'
import getBlog from '../daos/getBlog'

class BlogArticle extends React.Component {
	constructor(props) {
		super(props)
	}

	getPN(blog_focus) {
		if (typeof location != 'undefined') {
			if (location.pathname != undefined) {
				return location.pathname
			}
		}
		if (this.props.location != undefined) {
			if (this.props.location.pathname != undefined) {
				return this.props.location.pathname
			}
		}
		if (blog_focus != undefined) {
			return blog_focus.pathname | ""
		}
		return ""
	}

	componentWillMount() {
		var dispatch = this.props.dispatch
		var oblogs = this.props.blogs.toJS()
		if (oblogs.folders.length == 0) {
			get_folders(dispatch)			
		}
		var pathname = this.getPN()
		var oblogs = this.props.blogs.toJS()
		var blog_focus = oblogs.blog_focus
		var env = oblogs.env
		if (blog_focus.pathname != pathname) {
			console.log("Need to retrieve blog...")
			console.log(blog_focus.pathname)
			getBlog(dispatch, env, pathname)
		}
		get_related_content(dispatch, pathname)
	}

    handleNewComment(comment) {
    	// TODO: Maybe use a cognitive service here?
        console.log(comment.text);
    }

	render() {
		var pn = this.getPN()
		var oepisodes = this.props.episodes.toJS()
		var oblogs = this.props.blogs.toJS()
		var blog_focus = oblogs.blog_focus
		var osite = this.props.site.toJS()
		var disqus_username = osite.disqus_username
		var title = this.props.title
		var isEpisode = false

		if (blog_focus == undefined || blog_focus.blog == undefined) {
			return <Loading />
		}
		var showBio = true
		pn = blog_focus.blog.prettyname
		if (pn != undefined) {
			if (pn.indexOf('/episodes/')==0 || pn.indexOf('/transcripts/')==0) {
				showBio = false
			}			
		} else {
			showBio = false
		} 
		var top = <div></div>
		var focus_episode = oepisodes.focus_episode
		if (focus_episode.episode != undefined) {
			console.log("!!!")
			console.log(blog_focus)
			console.log(focus_episode)
			if (focus_episode.episode.guid == blog_focus.blog.guid) {
				try {
					top = (
						<div className="home-player">
							<LatestEpisodePlayer guid={focus_episode.guid} />
						</div>
					)
					isEpisode = true					
				}
				catch (err) {
					console.log(err)
					top = <div></div>
				}
			}
		}
		var bot = <div></div>
		if (isEpisode && false) {
			var tm = oblogs.transcript_map
			if (tm != undefined) {
				var guid = blog_focus.blog.guid
				var b = tm[guid]
				if (b != undefined) {
					if (b.prettyname != undefined) {
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
		}
		var content = blog_focus.content || ""
		if (content == "") {
			if (blog_focus.blog != undefined) {
				var title = blog_focus.blog.title
				content = "<div id='blog-content'><h2>" + title + "</h2><p>Loading...</p></div>"
			} else {
				content = "<div id='blog-content'><p>Loading....</p></div>"
			}
		} else if (blog_focus.content == "") {
				content = "<div id='blog-content'><p>Loading...</p></div>"
		} else {
			content = "<div id='blog-content'>" + content + "</div>"
		}

		var pn = blog_focus.blog.prettyname
		var uid = 'http://dataskeptic.com/blog' + pn
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
				<RelatedContent />
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
