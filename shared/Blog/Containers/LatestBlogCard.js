import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Loading from "../../Common/Components/Loading"
import Error from "../../Common/Components/Error"

class LatestBlogCard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var osite = this.props.site.toJS()
		var blog = this.props.blog
		var contributor = this.props.contributor
		var contributor_img = ""
		var contributor_prettyname = ""
		if (contributor != undefined) {
			contributor_img = contributor.img || ""
			contributor_prettyname = contributor.prettyname
		}
		if (blog == undefined) {
			return <Loading />			
		}
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
							<img className="home-latest-blog-img" src={contributor_img} />
						</div>
						<div className="home-latest-blog-header-right">
							<Link className="latest-blog-title" to={pn}>{blog.title}</Link>
							<div className="blog-author">{contributor_prettyname}</div>
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
