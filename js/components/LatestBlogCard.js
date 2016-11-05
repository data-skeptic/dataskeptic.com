import React from 'react'
import { Link } from 'react-router'

export default class LatestBlogCard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var blog = this.props.blog
		if (blog == undefined) {
			return (
				<div>
					Loading...
				</div>
			)			
		} else {
			var pn = blog.prettyname
			if (pn[0] == "/") {
				pn = pn.substring(1, pn.length)
			}
			pn = "/blog/" + pn
			var date = blog["publish_date"]
			return (
				<div>
					<Link class="blog-title" to={pn}>{blog.title}</Link>
					<span class="blog-date">{date}</span>
					<p>{blog.desc}</p>
				</div>
			)
		}
	}
}

