import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Loading from "./Loading"

class LatestBlogCard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var oblogs = this.props.blogs.toJS()
		var blogs = oblogs.blogs
		var blogs_loaded = oblogs.blogs_loaded
		if (blogs_loaded == 0) {
			return <Loading />
		}
		if (blogs.length == 0) {
			return <Error />
		}
		var blog = blogs[0]
		var pn = blog.prettyname
		if (pn[0] == "/") {
			pn = pn.substring(1, pn.length)
		}
		pn = "/blog/" + pn
		var date = blog["publish_date"]
		return (
			<div className="home-latest-blog-card">
				<div className="home-latest-blog-top"><p>From the blog:</p></div>
				<div className="home-latest-blog-card-container">
					<Link className="blog-title" to={pn}>{blog.title}</Link>
					<span className="blog-date">{date}</span>
					<p>{blog.desc}</p>
					<p> ...<Link to={pn}>[more]</Link></p>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ blogs: state.blogs }))(LatestBlogCard)
