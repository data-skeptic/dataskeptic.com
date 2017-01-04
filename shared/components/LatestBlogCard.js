import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Loading from "./Loading"

class LatestBlogCard extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		console.log("CWM")
		var blogs = this.props.blogs.toJS()
		var focus_blog = blogs.focus_blog
		if (focus_blog == undefined || focus_blog.blog == undefined) {
			var dispatch = this.props.dispatch
			setTimeout(function() {
				dispatch({type: "REQUEST_INJECT_BLOG", payload: {dispatch} })
			}, 10)
		}		
	}

	render() {
		console.log("LatestBlogCard")
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
		var oblogs = this.props.blogs.toJS()
		var blogs = oblogs.blogs || []
		var blog_focus   = oblogs.blog_focus || {loaded: 0}
		var blogs_loaded = oblogs.blogs_loaded
		if (blogs_loaded == 0 && blog_focus.loaded == 0) {
			return <Loading />
		}
		if (blogs_loaded < 0 || (blogs_loaded == 1 && blogs.length == 0) || blog_focus.loaded == -1) {
			return <Error />
		}
		var blog = undefined
		if (blog_focus.loaded == 1) {
			blog = blog_focus.blog
		}
		else if (blogs.length > 0) {
			var i=0
			while (i < blogs.length) {
				var b = blogs[i]
				var pn = b.prettyname
				if (pn.indexOf("/episodes/") == -1 && pn.indexOf("/transcripts/") == -1) {
					blog = b
					i = blogs.length
				}
				i++
			}
			blog = blogs[0]
		}
		if (blog == undefined) {
			return <Error />
		}
		var dstr = ""
		var pn = blog.prettyname
		if (pn != undefined) {
			if (pn[0] == "/") {
				pn = pn.substring(1, pn.length)
			}
			pn = "/blog/" + pn
			var date = new Date(blog["publish_date"])
            var dstr = monthNames[date.getMonth()].toUpperCase() + " " + date.getDate() + ", " + (date.getYear()+1900)
		}
		else {
			console.log("Bad state.")
			pn = "/blog/meta/relaunching-dataskeptic.com"
			var blog = {
				title: "Relaunching DataSkeptic.com",
				desc: "We've spent the last few weeks tinkering away on a new web design. As I write this, we're in the final stages of coding the s..."
			}
			dstr = "2016-11-16"
		}
		console.log("LatestBlogCard2")
		return (
			<div className="home-latest-blog-card">
				<div className="home-latest-blog-top"><p>From the blog:</p></div>
				<div className="home-latest-blog-card-container">
					<div className="blog-date">{dstr}</div>
					<Link className="blog-title" to={pn}>{blog.title}</Link>
					<p>{blog.desc}</p>
					<p> ...<Link to={pn}>[more]</Link></p>
				</div>
			</div>
		)			
	}
}

export default connect(state => ({ blogs: state.blogs }))(LatestBlogCard)
