import React, { Component } from 'react'
import { Link } from 'react-router'

export default class BlogListItem extends Component {
    render() {
    	var blog = this.props.blog
        var pn = blog.prettyname
        if (pn != undefined) {
            if (pn[0] == "/") {
                pn = pn.substring(1, pn.length)
            }
            pn = "/blog/" + pn
            var date = blog["publish_date"]
        }
        return (
            <div class="col-xs-12 col-sm-6">
	            <div class="blog-summary" key={blog.uri}>
	                <Link class="blog-title" to={pn}>{blog.title}</Link>
	                <span class="blog-date">{date}</span>
	                <p>{blog.desc}</p>
	            </div>
            </div>
        )
    }
}
