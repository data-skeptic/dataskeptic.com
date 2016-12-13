import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class BlogListItem extends Component {
    constructor(props) {
        super(props)
    }

    onClick(event) {
        var href = event.target.href
        var b = "/blog/"
        var i = href.indexOf(b)
        if (i >= 0) {
            href = href.substring(i+b.length-1, href.length)

            var dispatch = this.props.dispatch
            dispatch({type: "LOAD_BLOG", payload: {dispatch, pathname: href} })
        }
    }
    render() {
        var onClick = this.onClick
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
	                <Link onClick={this.onClick.bind(this)} className="blog-title" to={pn}>{blog.title}</Link>
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

export default connect(state => ({ player: state.player, blogs: state.blogs, episodes: state.episodes, site: state.site }))(BlogListItem)
