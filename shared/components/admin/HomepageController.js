import React from 'react'
import ReactDOM from 'react-dom'
import querystring from 'querystring'
import { connect } from 'react-redux'
import BlogSearchSelect from './blog/BlogSearchSelect'

class HomepageController extends React.Component {
  change = (f, val) => {
    this.props.dispatch({
      type: 'CMS_UPDATE_HOMEPAGE_FEATURE',
      payload: { f, val }
    })
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  update(me, title, event) {
    var dispatch = me.props.dispatch
    var target = event.target
    var f = target.id
    var val = target.value
    dispatch({ type: 'CMS_UPDATE_HOMEPAGE_FEATURE', payload: { f, val } })
  }

  save(dispatch) {
    dispatch({ type: 'CMS_SET_HOMEPAGE_FEATURE', payload: { dispatch } })
  }

  render() {
    var dispatch = this.props.dispatch
    var ocms = this.props.cms.toJS()
    console.log(ocms)
    const featured_blog_state = ocms['featured_blog_state']
    var featured_blog = ocms['featured_blog']
    var featured_blog2 = ocms['featured_blog2']
    var featured_blog3 = ocms['featured_blog3']
    var blog_id = -1
    var blog_id2 = -1
    var blog_id3 = -1
    if (featured_blog) {
      blog_id = featured_blog['blog_id']
    } else {
      blog_id = -1
    }
    if (featured_blog2) {
      blog_id2 = featured_blog2['blog_id']
    } else {
      blog_id2 = -1
    }
    if (featured_blog3) {
      blog_id3 = featured_blog3['blog_id']
    } else {
      blog_id3 = -1
    }
    if (blog_id == 0 || blog_id == undefined) {
      return <div className="center">Loading</div>
    }

    var me = this
    return (
      <div>
        <h3>Homepage content</h3>
        <div className="row">
          <div classname="col-xs-12 col-sm-2">Feature of the week blog_id:</div>
          <div classname="col-xs-3 col-sm-3">
            <BlogSearchSelect
              id="featured_blog"
              value={featured_blog}
              onChange={this.change}
            />
          </div>
          <div classname="col-xs-12 col-sm-2">2nd position blog_id:</div>
          <div classname="col-xs-3 col-sm3">
            <BlogSearchSelect
              id="featured_blog2"
              value={featured_blog2}
              onChange={this.change}
            />
          </div>
          <div classname="col-xs-12 col-sm-2">3rd position blog_id:</div>
          <div classname="col-xs-3 col-sm-3">
            <BlogSearchSelect
              id="featured_blog3"
              value={featured_blog3}
              onChange={this.change}
            />
          </div>
          <div classname="col-xs-6 col-sm-5">
            <button
              onClick={this.save.bind(this, dispatch)}
              disabled={featured_blog_state === 'submit'}
            >
              Update
            </button>
            {'   '}
            {featured_blog_state === 'submit' && (
              <span className="text-primary">Saving...</span>
            )}
            {featured_blog_state === 'success' && (
              <span className="text-success">Saved</span>
            )}
            {featured_blog_state === 'error' && (
              <span className="text-danger">Try again</span>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  cms: state.cms
}))(HomepageController)
