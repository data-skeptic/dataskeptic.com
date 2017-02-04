import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Loading from "./Loading"
import Error from "./Error"

class LatestBlogCard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var oblogs = this.props.blogs.toJS()
		var osite = this.props.site.toJS()
		var blogs = oblogs.blogs
		var i=0
		var blog = undefined
		while (i < blogs.length) {
			var b = blogs[i]
			var pn = b.prettyname
			if (pn.indexOf("/episodes/") == -1 && pn.indexOf("/transcripts/") == -1) {
				blog = b
				i = blogs.length
			}
			i++
		}
		if (blog == undefined) {
			return <Loading />			
		}
		var author = blog.author || ""
		var contributor = osite.contributors[author]
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
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
				title: "Loading",
				desc: "..."
			}
			dstr = "2016-11-16"
		}
		return (
			<div className="home-latest-blog-card">
				<div className="home-latest-blog-top"><p>From the blog:</p></div>
				<div className="home-latest-blog-card-container">
					<div className="home-latest-blog-header">
						<div className="home-latest-blog-header-left">
							<img className="home-latest-blog-img" src={contributor.img} />
						</div>
						<div className="home-latest-blog-header-right">
							<Link className="blog-title" to={pn}>{blog.title}</Link>
							<div className="blog-author">{contributor.prettyname}</div>
							<div className="blog-date">{dstr}</div>
						</div>
					</div>
					<p>{blog.desc}</p>
					<p> ...<Link to={pn}>[more]</Link></p>
				</div>
			</div>
		)			
	}
}

export default connect(state => ({ site: state.site, blogs: state.blogs }))(LatestBlogCard)
