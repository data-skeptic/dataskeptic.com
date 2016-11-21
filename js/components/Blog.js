import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import NavLink from './NavLink'

import NotFound from './NotFound'
import BlogList from "./BlogList"
import BlogNav from "./BlogNav"
import BlogItem from "./BlogItem"
import Loading from "./Loading"
import LatestEpisodePlayer from "./LatestEpisodePlayer"

export default class Blog extends React.Component {
	constructor(props) {
		super(props)
	}
	
	getEpisode(guid) {
		var episodeMap = this.props.episodeMap
		var episode = episodeMap[guid]
		return episode
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
			if (pn.indexOf(typ) != -1) {
				sub.push(blog)
			}
		}
		return sub
	}

	render() {
		if (!this.props.blogs_loaded) {
			return <div><Loading /></div>
		}
		var blogs = this.props.blogs
		var folders = this.props.folders
		var pathname = this.props.location.pathname
		if (pathname == '/blog' || pathname == '/blog/') {
			blogs = this.remove_type("episodes", blogs)
			blogs = this.remove_type("transcripts", blogs)
			return (
				<div class="center">
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
					console.log("match")
					return b
				}
			}
			return undefined
		}
		var blog = fn(pathname, blogs)
		console.log(blog)
		if (blog == undefined) {
			// TODO: make this general and not error prone
			for (var i=0; i < folders.length; i++) {
				var folder = folders[i]
				if (pathname.indexOf(folder) > 0) {
					var fblogs = this.only_type(folder, blogs)
					return (
						<div class="center">
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
				var episode = this.getEpisode(guid)
				var onPlayToggle = this.props.onPlayToggle
				var is_playing = false
				console.log([episode, onPlayToggle])
				top = (
					<div class="home-player">
						<LatestEpisodePlayer title="" episode={episode} onPlayToggle={onPlayToggle} is_playing={is_playing} />
					</div>
				)
			}
			var uri = "https://s3.amazonaws.com/" + this.props.bucket + '/' + blog["rendered"]
			return (
				<div class="center">
					<BlogNav folders={folders} pathname={pathname} />
					{top}
					<BlogItem src={uri} pathname={pathname}  />
				</div>
			)
		}
	}
}
