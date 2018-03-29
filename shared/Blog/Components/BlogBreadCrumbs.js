import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BlogBreadCrumbs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var prettyname = this.props.prettyname
    var arr = prettyname.split('/')
    var items = []
    var url = ''
    for (var i = 0; i < arr.length - 1; i++) {
      var name = arr[i]
      if (i == 0) {
        name = 'root'
        url = '/blog/'
      } else {
        url += name + '/'
      }
      var item = { name: name, url: url }
      items.push(item)
    }
    arr[0] = 'home'
    return <div className="blog-bread-crumbs" />
  }
}

export default connect(state => ({}))(BlogBreadCrumbs)
