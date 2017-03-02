/*
	Will ship you to either BlogArticle for a post
	or to Blog.js for listings
*/
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import NotFound from '../../NotFound/Components/NotFound'
import BlogArticle from "../Containers/BlogArticle"
import BlogNav from "../Components/BlogNav"
import BlogItem from "../Components/BlogItem"
import Error from "../../Common/Components/Error"
import Loading from "../../Common/Components/Loading"
import transform_pathname from "../../utils/transform_pathname"
import getBlog from "../../daos/getBlog"

class BlogRouter extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		var dispatch = this.props.dispatch
		var pathname = this.props.location.pathname
		var k = '/blog'
		var prettyname = ""
		if (pathname.length > k.length && pathname.indexOf(k) == 0) {
			prettyname = pathname.substring(k.length, pathname.length)
		}
		var oblogs = this.props.blogs.toJS()
		var env = oblogs.env
		var folders = oblogs.folders || []
		var blog_focus = oblogs.blog_focus
		if (prettyname != blog_focus.prettyname) {
			getBlog(dispatch, env, prettyname)
		}
	}

	render() {
		var pathname = this.props.location.pathname
		var k = '/blog'
		var prettyname = ""
		if (pathname.length > k.length && pathname.indexOf(k) == 0) {
			prettyname = pathname.substring(k.length, pathname.length)
		}
		var oblogs = this.props.blogs.toJS()
		var folders = oblogs.folders || []
		var blog_focus = oblogs.blog_focus
		
		/*
			Check against folders
		*/
		var i=0
		while (i < folders.length) {
			var folder = "/" + folders[i] + "/"
			if (folder == prettyname) {
				return <Blog pathname={pathname} />
			}
			i += 1
		}
		/*
			Must be a blog page if we got here
		*/

		return (
			<div className="center">
				<br />
				<BlogArticle postUrl={pathname} />
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => ({
		player: state.player,
		blogs: state.blogs,
		episodes: state.episodes,
		site: state.site
	}))
(BlogRouter)

