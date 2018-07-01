import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import BlogBreadCrumbs from './BlogBreadCrumbs'
import { Link } from 'react-router'

class BlogTopNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var pathname = this.props.pathname
    var pname = pathname.substring(5, pathname.length)
    if (pname == '') {
      pname = '/'
    }
    var blogs = this.props.blogs
    var cmap = {}
    for (var i = 0; i < blogs.length; i++) {
      var blog = blogs[i]
      var arr = blog['prettyname'].split('/')
      var category = arr[1]
      if (
        category != '' &&
        category != 'episodes' &&
        category != 'transcripts'
      ) {
        if (category in cmap) {
          cmap[category] += 1
        } else {
          cmap[category] = 1
        }
      }
    }
    var cats = Object.keys(cmap)
    cats.sort()
    if (cats.length > 1) {
      return (
        <div className="blog-top-nav">
        </div>
      )
    } else {
      return (
        <div className="blog-top-nav">
          <Link to="/blog/">root</Link>/
        </div>
      )
    }
  }
}

export default connect(state => ({}))(BlogTopNav)
