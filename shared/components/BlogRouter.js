/*
	Will ship you to either BlogArticle for a post
	or to Blog.js for listings
*/
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import NotFound from './NotFound'
import Blog from "./Blog"
import BlogArticle from "./BlogArticle"
import BlogNav from "./BlogNav"
import BlogItem from "./BlogItem"
import Error from "./Error"
import Loading from "./Loading"
import transform_pathname from "../utils/transform_pathname"
import getBlog from '../daos/getBlog'

class BlogRouter extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		console.log("cwr")
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
		console.log([prettyname, blog_focus.prettyname])
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
				<BlogNav folders={folders} pathname={pathname} />
				<BlogArticle />
			</div>
		)
	}
}

export default connect(state => ({ player: state.player, blogs: state.blogs, episodes: state.episodes, site: state.site }))(BlogRouter)

