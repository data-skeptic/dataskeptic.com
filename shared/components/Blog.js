import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
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
		var oblogs = this.props.blogs.toJS()
		var oepisodes = this.props.episodes.toJS()
		var osite = this.props.site.toJS()
		console.log(["osite", osite])
		var blogs_loaded = oblogs.blogs_loaded
		if (blogs_loaded == undefined) {
			blogs_loaded = 0
		}
		if (blogs_loaded == 0) {
			return <div><Loading /></div>
		}
		var blogs = oblogs.blogs
		var folders = oblogs.folders
		var pathname = this.props.location.pathname
		if (pathname == '/blog' || pathname == '/blog/') {
			blogs = this.remove_type("episodes", blogs)
			blogs = this.remove_type("transcripts", blogs)
			return (
				<div className="center">
					<BlogNav folders={folders} pathname={pathname} />
					<BlogList blogs={blogs} />
				</div>
			)
		}
		pathname = pathname.substring("/blog".length, pathname.length)
		var fn = function(pn, blogs) {
			for (var i in blogs) {
				var b = blogs[i]
				var pn = b["prettyname"]
				if (pn == pathname) {
					return b
				}
			}
			return undefined
		}
		var blog = fn(pathname, blogs)
		if (blog == undefined) {
			// TODO: make this general and not error prone
			for (var i=0; i < folders.length; i++) {
				var folder = folders[i]
				if (pathname.indexOf(folder) > 0) {
					var fblogs = this.only_type(folder, blogs)
					return (
						<div className="center">
							<BlogNav folders={folders} pathname={pathname} />
							<BlogList blogs={fblogs} />
						</div>
					)
				}
			}
			return (
				<NotFound location={pathname} />
			)
		}
		else {
			var top = ""
			var isEpisode = blog.guid != undefined
			if (isEpisode) {
				var guid = blog.guid
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
			var env = oblogs.env + "."
			if (env == "prod.") {
				env = ""
			}
			var uri = "https://s3.amazonaws.com/" + env + 'dataskeptic.com/' + blog["rendered"]
			var title = blog["title"]
			return (
				<div className="center">
					<BlogNav folders={folders} pathname={pathname} />
					{top}
					<BlogItem src={uri} pathname={pathname} title={title} />
				</div>
			)
		}
	}
}

export default connect(state => ({ player: state.player, blogs: state.blogs, episodes: state.episodes, site: state.site }))(Blog)

