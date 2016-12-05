import React, { Component } from 'react'
import { Link } from 'react-router'

export default class BlogListItem extends Component {
    onClick(event) {
        console.log("BLI click")
        console.log(event)
    }
    render() {
        var onClick = this.props.onClick
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
            <div className="col-xs-12">
	            <div className="blog-summary" key={blog.uri}>
	                <Link onClick={onClick} className="blog-title" to={pn}>{blog.title}</Link>
	                <span className="blog-date">{date}</span>
	                <p>
                        {blog.desc}
                        ... <Link className="blog-title" to={pn}>[more]</Link>
                    </p>
	            </div>
            </div>
        )
    }
}
