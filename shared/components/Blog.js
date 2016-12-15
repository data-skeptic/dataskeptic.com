import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import NotFound from './NotFound'
import BlogList from "./BlogList"
import BlogNav from "./BlogNav"
import BlogItem from "./BlogItem"
import Error from "./Error"
import Loading from "./Loading"
import LatestEpisodePlayer from "./LatestEpisodePlayer"
import transform_pathname from "../utils/transform_pathname"

class Blog extends React.Component {
	constructor(props) {
		super(props)
		var oblogs = this.props.blogs.toJS()
		var blogs_loaded = oblogs.blogs_loaded || 0
		var blog_focus   = oblogs.blog_focus || {loaded: 0}
		var opathname = this.props.location.pathname
		var folders = oblogs.folders || []
		var pathname = transform_pathname(opathname)
		var dispatch = this.props.dispatch
		var guid = undefined
		if (blog_focus != undefined) {
			guid = blog_focus.guid
		}
		var isEpisode = guid != undefined
		if (isEpisode) {
			dispatch({type: "SET_FOCUS_EPISODE", payload: {guid} })			
		}

		if (pathname != "" && pathname != "/") {
			// Single page
			if (blog_focus.loaded == 1) {
				console.log("blog_focus")
				console.log(blog_focus)
				var content = blog_focus.content
				if (content == undefined || content == "") {
					var blog = blog_focus.blog
					console.log("Retrieve blog content")
					dispatch({type: "ADD_BLOG", payload: {dispatch, blog} })
				}
			}
			else if (blogs_loaded == 1) {
				var blogs = oblogs.blogs
				for (var i=0; i < blogs.length; i++) {
					var b = blogs[i]
					if (b.prettyname == pathname) {
						var blog = b
						dispatch({type: "SET_FOCUS_BLOG", payload: {blog} })
						dispatch({type: "LOAD_BLOG", payload: {dispatch, pathname: pathname} })
					}
				}
			}
			else {
				dispatch({type: "LOAD_BLOG", payload: {dispatch, pathname: pathname} })
			}
		}
	}

	componentDidUpdate() {
	}

	remove_type(typ, arr) {
		var sub = []
		var key = "/" + typ + "/"
		for (var i=0; i < arr.length; i++) {
			var blog = arr[i]
			var pn = blog.prettyname
			if (pn.indexOf(typ) == -1) {
				sub.push(blog)
			}
		}
		return sub
	}

	only_type(typ, arr) {
		var sub = []
		var key = "/" + typ + "/"
		for (var i=0; i < arr.length; i++) {
			var blog = arr[i]
			var pn = blog.prettyname
			if (pn.indexOf(key) != -1) {
				sub.push(blog)
			}
		}
		return sub
	}
	isListings(folders, pathname) {
		for (var i=0; i < folders.length; i++) {
			var folder = folders[i]
			var sfolder = "/" + folder
			if (pathname.indexOf(sfolder) == 0 && pathname.length == sfolder.length) {
				return true
			}
		}
		if (pathname == "" || pathname == "/") {
			return true
		}
		return false
	}

	render() {
		var opathname = this.props.location.pathname
		var pathname = transform_pathname(opathname)

		var oblogs = this.props.blogs.toJS()
		var blogs_loaded = oblogs.blogs_loaded || 0
		var blog_focus   = oblogs.blog_focus || {loaded: 0}
		var blog = blog_focus.blog
		var isEpisode = false
		if (blog != undefined) {
			isEpisode = blog.guid != undefined
		}
		var content = blog_focus.content
		var folders = oblogs.folders || []
		var blogs = oblogs.blogs || []
		var listings = this.isListings(folders, pathname)
		var a = pathname.length
		var lastChar = opathname.substring(a-1, a)
		if (lastChar == "/") {
			listings = true
		}

		if (listings) {
			// Navigation / listings

			for (var i=0; i < folders.length; i++) {
				var folder = folders[i]
				var sfolder = "/" + folder
				if (pathname.indexOf(sfolder) == 0 && pathname.length == sfolder.length) {
					blogs = this.only_type(folder, blogs)
				}
			}

			if (pathname == "" || pathname == "/") {
				blogs = this.remove_type("episodes", blogs)
				blogs = this.remove_type("transcripts", blogs)
			}

			if (blogs_loaded == 1) {
				return (
					<div className="center">
						<BlogNav folders={folders} pathname={pathname} />
						<BlogList blogs={blogs} />
					</div>
				)
			} else if (blogs_loaded == -1) {
				return <div><Error /></div>
			} else {
				return <div><Loading /></div>
			}
		}
		else {
			// It's a listing or it's a navigation page but we don't know that until other async finishes

			if (blog != undefined && content != undefined) {
				var env = oblogs.env + "."
				if (env == "prod.") {
					env = ""
				}
				var title = blog["title"]
				var top = ""
				if (isEpisode) {
					try {
						top = (
							<div className="home-player">
								<LatestEpisodePlayer title="" />
							</div>
						)					
					}
					catch (err) {
						console.log(err)
						top = <div></div>
					}
				}
				return (
					<div className="center">
						<BlogNav folders={folders} pathname={pathname} />
						{top}
						<BlogItem pathname={pathname} title={title} />
					</div>
				)
			} else if (blog_focus.loaded == -1) {
				return <div><Error /></div>
			} else {
				return <div><Loading /></div>				
			}
		}
	}
}

export default connect(state => ({ player: state.player, blogs: state.blogs, episodes: state.episodes, site: state.site }))(Blog)

