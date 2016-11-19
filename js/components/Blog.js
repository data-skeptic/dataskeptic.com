import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import NavLink from './NavLink'

import NotFound from './NotFound'
import BlogList from "./BlogList"
import Loading from "./Loading"

export default class Blog extends React.Component {
	constructor(props) {
		super(props)
	}
	
	getEpisode(guid) {
		var episodes = this.props.episodes

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
		console.log(pathname)
		if (pathname == '/blog' || pathname == '/blog/') {
			blogs = this.remove_type("episodes", blogs)
			blogs = this.remove_type("transcripts", blogs)
			return (
				<div class="center">
					Categories:
					<ol class="breadcrumb">
						<div class="blog-categories">
							{folders.map(function(folder) {
								return (
									<li key={folder}>
										<a class="blog-category">{folder}</a>
									</li>
								)
							})}
						</div>
					</ol>
					<BlogList blogs={blogs} />
				</div>
			)
		}
		pathname = pathname.substring("/blog".length, pathname.length)
		console.log(pathname)
		var blog = undefined
		for (var i in blogs) {
			var b = blogs[i]
			var pn = b["prettyname"]
			if (pn == pathname) {
				blog = b
			}
		}
		if (blog == undefined) {
			// TODO: make this general and not error prone
			for (var i=0; i < folders.length; i++) {
				var folder = folders[i]
				if (pathname.indexOf(folder) > 0) {
					var fblogs = this.only_type(folder, blogs)
					return <BlogList blogs={fblogs} />
				}
			}
			return (
				<NotFound location={pathname} />
			)
		}
		else {
			var top = ""
			var isEpisode = blog.guid != undefined
			console.log([blog, blog.guid, isEpisode])
			if (isEpisode) {
				var episode = this.getEpisode(blog.guid)
				var onPlayToggle = this.props.onPlayToggle
				var is_playing = false
				top = (
					<div>
						<h2>Episode</h2>
						TODO: add player and title
						<LatestEpisodePlayer episode={episode} onPlayToggle={onPlayToggle} is_playing={is_playing} />
					</div>
				)
			}
			var uri = "https://s3.amazonaws.com/" + this.props.bucket + '/' + blog["rendered"]
			return (
				<div class="center">
					{top}
					<BlogItem src={uri} pathname={pathname}  />
				</div>
			)
		}
	}
}
