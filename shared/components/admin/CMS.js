import Loading from '../../Common/Components/Loading'
import React from 'react'
import ReactDOM from 'react-dom'
import querystring from 'querystring'
import { connect } from 'react-redux'
import BlogUpdater from './BlogUpdater'

class CMS extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: props.mode
    }
  }

  componentDidMount() {
    var dispatch = this.props.dispatch
    if (this.state.mode == 'pending') {
      dispatch({ type: 'CMS_LOAD_PENDING_BLOGS', payload: { dispatch } })
    } else {
      var limit = 20
      var offset = 0
      var prefix = ''
      var payload = { limit, offset, prefix, dispatch }
      dispatch({ type: 'CMS_LOAD_RECENT_BLOGS', payload })
    }
  }

  render() {
    var ocms = this.props.cms.toJS()
    var mode = this.state.mode
    var dispatch = this.props.dispatch
    var blogs = []
    var loaded = false
    if (mode == 'pending') {
      blogs = ocms['pending_blogs'] || []
      loaded = ocms.pending_blogs_loaded
    } else if (mode == 'recent') {
      blogs = ocms['recent_blogs'] || []
      loaded = ocms.recent_blogs_loaded
    }
    if (blogs.length > 0) {
      loaded = true
    }
    var cn = 'cms-' + mode
    if (!loaded) {
      return (
        <div className={cn}>
          <h3>CMS {mode}</h3>
          <Loading />
        </div>
      )
    } else if (blogs.length == 0) {
      return (
        <div className={cn}>
          <p>Nothing to Show.</p>
        </div>
      )
    }
    return (
      <div className={cn}>
        <h3>CMS {mode}</h3>
        <div>
          {blogs.map((blog, index) => <BlogUpdater blog={blog} odd={index % 2 === 0} key={blog.blog_id}/>)}
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  cms: state.cms
}))(CMS)
