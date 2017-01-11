import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class BlogListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
    	var blog = this.props.blog
        var pn = blog.prettyname
        var datestr = ""
        if (pn != undefined) {
            if (pn[0] == "/") {
                pn = pn.substring(1, pn.length)
            }
            pn = "/blog/" + pn
            var date = blog["publish_date"]
            date = new Date(date)
            datestr = monthNames[date.getMonth()].toUpperCase() + " " + date.getDate() + ", " + (date.getYear()+1900)
        }
        return (
            <div className="col-xs-12">
	            <div className="blog-summary" key={blog.uri}>
                    <div className="blog-date">{datestr}</div>
	                <Link className="blog-title" to={pn}>{blog.title}</Link>
	                <p className="blog-desc">
                        {blog.desc}
                        ... <Link className="blog-view-more" to={pn}>View More &gt;</Link>
                    </p>
	            </div>
            </div>
        )
    }
}

export default connect(state => ({ player: state.player, blogs: state.blogs, episodes: state.episodes, site: state.site }))(BlogListItem)
