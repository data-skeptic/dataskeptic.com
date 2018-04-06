import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class RelatedContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { items } = this.props
    if (!items) {
      console.log('ERROR: undefined sent to RelatedContent')
      items = []
    }
    if (items.length == 0) {
      return <div className="blog-related-content-container" />
    }
    return (
      <div>
        {items.map(function(item) {
          var dest = item.dest
          var title = item.title
          var body = item.body
          var type = item.type
          if (type == 'person') {
            return (
              <div className="related-content-container row">
                <div className="related-content-person-left col-xs-12 col-sm-4">
                  <img className="related-content-person-img" src={dest} />
                </div>
                <div className="related-content-person-right col-xs-12 col-sm-8">
                  <h3 className="related-content-h3">{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            )
          } else if (type == 'homepage-image') {
            // Skipping homepage image for now
          } else if (type == 'internal-link') {
            var to = '/blog' + item.prettyname
            // TODO: incorporate these three elements into the design
            var author = item.author
            var publish_date = item.publish_date
            var guid = item.guid
            return (
              <div className="related-content-container">
                <div className="related-content-imageless-inner">
                  <Link to={to}>
                    <h3 className="related-content-h3">{title}</h3>
                  </Link>
                  <p>
                    {body} <Link to={to}>[read more]</Link>
                  </p>
                </div>
              </div>
            )
          } else if (type == 'external-link') {
            var to = dest
            // TODO: incorporate these three elements into the design
            var author = item.author
            var publish_date = item.publish_date
            var guid = item.guid
            return (
              <div className="related-content-container">
                <div className="related-content-imageless-inner">
                  <Link to={to}>
                    <h3 className="related-content-h3">{title}</h3>
                  </Link>
                  <p>{body}</p>
                  <p>
                    <a href={dest}>{dest}</a>
                  </p>
                </div>
              </div>
            )
          } else {
            return <div className="related-content" />
          }
        })}
      </div>
    )
  }
}
export default RelatedContent
