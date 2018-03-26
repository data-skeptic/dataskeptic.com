import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import { redirects_map } from '../../../redirects'
import AuthorLink from '../../components/AuthorLink'

class BlogListItem extends Component {
  constructor(props) {
    super(props)
  }

  formatLink(link) {
    if (link.indexOf('/') === 0) {
      link = link.substring(1, link.length)
    }

    link = '/blog/' + link

    if (!!redirects_map[link]) {
      return redirects_map[link]
    }

    return link
  }

  render() {
    const { onClick, blog, contributor, isLatest = false } = this.props
    var img = ''
    var prettyname = ''
    if (contributor) {
      if (contributor.img) {
        img = contributor.img
      }
      if (contributor.prettyname) {
        prettyname = contributor.prettyname
      }
    }

    const link = this.formatLink(blog.prettyname)
    const date = isLatest
      ? moment(blog.publish_date).fromNow()
      : moment(blog.publish_date).format('MMMM D, YYYY')
    const preview =
      blog.related && blog.related.filter(r => r.type === 'homepage-image')[0]
    const summaryClasses = preview
      ? 'col-xs-12 col-sm-9 col-md-9 blog-summary'
      : 'col-xs-12 col-sm-12 col-md-12 blog-summary'
    return (
      <div className="row blog-list-item" key={blog.uri}>
        {preview && (
          <div className="col-xs-12 col-sm-3 col-md-3 blog-preview">
            <Link to={link} onClick={onClick} className="no-line">
              <img src={preview.dest} />
            </Link>
          </div>
        )}
        <div className={summaryClasses}>
          <div>
            <span className="blog-date">{date}</span>
          </div>
          <div className="media">
            <div className="media-left contributor-preview">
              <img src={img} />
            </div>
            <div className="media-body">
              <Link
                className="blog-title media-heading no-line"
                to={link}
                onClick={onClick}
              >
                {blog.title}
              </Link>
              <p className="by">
                by{' '}
                <b>
                  <AuthorLink author={contributor.author} className="no-line">
                    {prettyname}
                  </AuthorLink>
                </b>
              </p>
            </div>
          </div>
          <p className="blog-desc">
            {blog.abstract}
            <br />
            <Link className="blog-view-more no-line" to={link}>
              View More &gt;
            </Link>
          </p>
        </div>
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  onClick: ownProps.onClick,

  player: state.player,
  blogs: state.blogs,
  episodes: state.episodes,
  site: state.site
}))(BlogListItem)
