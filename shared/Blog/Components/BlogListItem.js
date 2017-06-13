import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment';

import { redirects_map } from '../../../redirects';

class BlogListItem extends Component {
    constructor(props) {
        super(props)
    }

    formatLink(link) {
        if (link.indexOf('/') === 0) {
            link = link.substring(1, link.length);
        }

        link = "/blog/" + link;

        if (!!redirects_map[link]) {
            return redirects_map[link];
        }

        return link;
    }

    render() {
        const { onClick, blog, isLatest=false } = this.props;

        const link = this.formatLink(blog.prettyname);
        const date = isLatest ? moment(blog.publish_date).fromNow() : moment(blog.publish_date).format('MMMM D, YYYY');

        return (
            <div className="col-xs-12">
	            <div className="blog-summary" key={blog.uri}>
                    <div>
                        <span className="blog-date">{date}</span>
                    </div>
                    <div className="media">
                        {blog.contributor && <div className="media-left contributor-preview">
                            <img src={blog.contributor.img}/>
                        </div>}
                        <div className="media-body">
                            <Link className="blog-title media-heading" to={link} onClick={ onClick }>{blog.title}</Link>
                            {blog.contributor && <p className="by">by <b>{blog.contributor.prettyname}</b></p>}
                        </div>
                    </div>
	                <p className="blog-desc">
                        {blog.desc}
                        ... <Link className="blog-view-more" to={link}>View More &gt;</Link>
                    </p>
	            </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        onClick: ownProps.onClick,

        player: state.player,
        blogs: state.blogs,
        episodes: state.episodes,
        site: state.site
    })
)(BlogListItem)
