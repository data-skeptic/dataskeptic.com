import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import NotFound from './NotFound'
import BlogList from "./BlogList"
import BlogNav from "./BlogNav"
import BlogItem from "./BlogItem"
import Loading from "./Loading"
import LatestEpisodePlayer from "./LatestEpisodePlayer"

class Blog extends React.Component {
	constructor(props) {
		super(props)
		var oblogs = this.props.blogs.toJS()
		var blogs_loaded = oblogs.blogs_loaded || 0
		var blog_focus   = oblogs.blog_focus || {loaded: 0}
		var pathname = this.props.location.pathname
		pathname = pathname.substring("/blog".length, pathname.length)
		if (blogs_loaded == 0 && blog_focus.loaded == 0) {
			var dispatch = this.props.dispatch
			dispatch({type: "LOAD_BLOG", payload: {dispatch, pathname} })
		}
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

	render() {
		console.log("rb")
		var pathname = this.props.location.pathname
		pathname = pathname.substring("/blog".length, pathname.length)

		var oblogs = this.props.blogs.toJS()
		var blogs_loaded = oblogs.blogs_loaded || 0
		var blog_focus   = oblogs.blog_focus || {loaded: 0}
		var folders = oblogs.folders || []
		var blogs = oblogs.blogs || []
		var listings = false

		for (var i=0; i < folders.length; i++) {
			var folder = folders[i]
			var sfolder = "/" + folder
			if (pathname.indexOf(sfolder) == 0 && pathname.length == sfolder.length) {
				listings = true
				blogs = this.only_type(folder, blogs)
			}
		}

		if (pathname == "" || pathname == "/") {
			blogs = this.remove_type("episodes", blogs)
			blogs = this.remove_type("transcripts", blogs)
			listings = true
		}


		if (listings) {
			// Navigation / listings
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
			// Single page
			var blog = undefined
			if (blog_focus.loaded == 1) {
				console.log("Got specific blog directly")
				blog = blog_focus.blog
			}
			else if (blogs_loaded == 1) {
				for (var i=0; i < blogs.length; i++) {
					var b = blogs[i]
					if (b.prettyname == pathname) {
						console.log("Got blog from full cache")
						blog = b
					}
				}
			}

			if (blog != undefined) {
				var env = oblogs.env + "."
				if (env == "prod.") {
					env = ""
				}
				var uri = "https://s3.amazonaws.com/" + env + 'dataskeptic.com/' + blog["rendered"]
				var title = blog["title"]
				var top = ""
				var isEpisode = blog.guid != undefined
				if (isEpisode) {
					var guid = blog.guid
					try {
						var oepisodes = this.props.episodes.toJS() || []
						var episode = oepisodes.episodes_map[guid]
						var player = this.props.player.toJS()
						var is_playing = false
						var pepisode = player.episode
						if (pepisode != undefined && episode.guid == pepisode.guid) {
							is_playing = player.is_playing
						}
						top = (
							<div className="home-player">
								<LatestEpisodePlayer title="" episode={episode} />
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
						<BlogItem src={uri} pathname={pathname} title={title} />
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

