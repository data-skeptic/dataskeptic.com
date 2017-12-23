import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'

class RelatedContentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "related": []
    }
  }

  componentDidMount() {
    var dispatch = this.props.dispatch
    dispatch({type: "RELATED_CONTENT_LIST", payload: {dispatch} })
  }

  delete(content_id, dispatch) {
    dispatch({type: "RELATED_CONTENT_DELETE", payload: {content_id} })
  }

  render() {
    var me = this
    var related = this.props.items || []
    console.log(related)
    var dispatch = this.props.dispatch
  	return (
      <div>
        <h3>Recent Related Content</h3>
        {
            related.map((rc) => {
              console.log(rc)
              var content_id = rc['content_id']
              var blog_id = rc['blog_id']
              var dest = rc['dest']
              var title = rc['title']
              return (
                <div className="admin-related-content-row">
                  {blog_id} | {dest} | {title} <button onClick={this.delete.bind(this, content_id, dispatch)}>Delete</button>
                </div>
              )
            })
        }
      </div>
  	)
  }
}
export default connect(state => ({ }))(RelatedContentList)


