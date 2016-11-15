import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

import BlogItem from "./BlogItem"
import Loading from "./Loading"

export default class Blog extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		if (!this.props.blogs_loaded) {
			return <div><Loading /></div>
		}
		var blogs = this.props.blogs
		blogs = blogs.slice(0, 10)
		var pathname = this.props.location.pathname
		console.log(pathname)
		if (pathname == '/blog' || pathname == '/blog/') {
			return (
				<div class="center">
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
		var eppath = "/blog/episodes/"
		var top = ""
		if (pathname.substring(0, eppath.length) == eppath ) {
			top = (
				<div>
					<h2>Episode</h2>
					TODO: add player and title
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
