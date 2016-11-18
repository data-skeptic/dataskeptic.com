import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

import BlogItem from "./BlogItem"
import Loading from "./Loading"

export default class Blog extends React.Component {
	constructor(props) {
		super(props)
	}
	
	getEpisode(guid) {
		var episodes = this.props.episodes

	}

	render() {
		if (!this.props.blogs_loaded) {
			return <div><Loading /></div>
		}
		var blogs = this.props.blogs
		var folders = this.props.folders
		var pathname = this.props.location.pathname
		console.log(pathname)
		console.log(folders)
		if (pathname == '/blog' || pathname == '/blog/') {
			blogs = blogs.slice(0, 10)
			return (
				<div class="center">
					Categories:
					<div class="blog-categories">
						{folders.map(function(folder) {
							return <div key={folder} class="blog-category">{folder}</div>
						})}
					</div>
					{blogs.map(function(blog) {
						var pn = blog.prettyname
						if (pn != undefined) {
							if (pn[0] == "/") {
								pn = pn.substring(1, pn.length)
							}
							pn = "/blog/" + pn
							var date = blog["publish_date"]
							return (
								<div class="blog-summary" key={blog.uri}>
									<Link class="blog-title" to={pn}>{blog.title}</Link>
									<span class="blog-date">{date}</span>
									<p>{blog.desc}</p>
								</div>
							)
						}
					})}
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
			return (
				<div class="blog-error">
					Sorry, there was an error trying to load that file.
				</div>
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
