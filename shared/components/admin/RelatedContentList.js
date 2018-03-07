import React from 'react'
import ReactDOM from 'react-dom'
import querystring from 'querystring'
import { connect } from 'react-redux'

class RelatedContentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      related: []
    }
  }

  componentDidMount() {
    var dispatch = this.props.dispatch
    dispatch({ type: 'RELATED_CONTENT_LIST', payload: { dispatch } })
  }

  delete(content_id, dispatch) {
    dispatch({ type: 'RELATED_CONTENT_DELETE', payload: { content_id } })
  }

  render() {
    var me = this
    var related = this.props.items || []
    var dispatch = this.props.dispatch
    if (related.length == 0) {
      return (
        <div>
          <h3>Recent Related Content</h3>
          <p>No related content yet. Add some relationships!</p>
        </div>
      )
    }
    return (
      <div>
        <h3>Recent Related Content</h3>
        {related.map(rc => {
          var content_id = rc['content_id']
          var blog_id = rc['blog_id']
          var dest = rc['dest']
          var title = rc['title']
          var body = rc['body']
          return (
            <div className="row admin-related-content-row">
              <div className="col-xs-12 col-sm-1">blog_id:</div>
              <div className="col-xs-12 col-sm-11">{blog_id}</div>
              <div className="col-xs-12 col-sm-1">title:</div>
              <div className="col-xs-12 col-sm-11">{title}</div>
              <div className="col-xs-12 col-sm-1">Destination:</div>
              <div className="col-xs-12 col-sm-11">{dest}</div>
              <div className="col-xs-12 col-sm-1">Comment:</div>
              <div className="col-xs-12 col-sm-11">{body}</div>
              <div className="col-xs-12 col-sm-1" />
              <div className="col-xs-12 col-sm-11">
                <button onClick={this.delete.bind(this, content_id, dispatch)}>
                  Delete
                </button>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
export default connect(state => ({}))(RelatedContentList)
