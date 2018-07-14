import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { snserror } from '../../SnsUtil'

import BlogTopNav from '../Components/BlogTopNav'
import BlogItem from '../Components/BlogItem'
import BlogList from '../Components/BlogList'
import NoBlogs from '../Components/NoBlogs'
import Loading from '../../Common/Components/Loading'
import page from '../../Layout/hoc/page'

const normalizePathname = path => path.replace(/\/\//g, '/')

class BlogRouter extends Component {
  // static getPageMeta(state) {
  //   const isExists = state.blogs.getIn(['blog_focus', 'blog'])
  //   if (!isExists) {
  //     return {
  //       title: 'Data Skeptic',
  //       description: ''
  //     }
  //   }
  //
  //   const post = state.blogs.getIn(['blog_focus', 'blog']).toJS()
  //   const isEpisode = !isUndefined(post.guid)
  //
  //   let meta = {
  //     //title: `${post.title} | Data Skeptic`,
  //     title: `Data Skeptic`,
  //     description: post.desc
  //   }
  //
  //   if (isEpisode) {
  //     meta.image = post.preview
  //   }
  //
  //   return meta
  // }

  handle_reload(pathname, oldpathname) {
    const dispatch = this.props.dispatch
    var pname = pathname.substring(5, pathname.length)
    var ocms = this.props.cms.toJS()
    var blogs = ocms['recent_blogs'] || []
    var exact = undefined
    for (var blog of blogs) {
      var pn = blog['prettyname']
      if (pname == pn) {
        exact = blog
      }
    }
    var request_reload = pathname != oldpathname
    if (exact) {
      if (blogs.length != 1) {
        const blogs = [exact]
        const prefix = pname
        const payload = { blogs, prefix }
        dispatch({ type: 'CMS_SET_RECENT_BLOGS', payload: payload })
      } else if (blogs[0]['blog_id'] !== exact['blog_id']) {
        request_reload = true
      }
    }
    if (request_reload) {
      console.log('Asking blogs to reload')
      var payload = { limit: 10, offset: 0, prefix: pname, dispatch }
      dispatch({ type: 'CMS_LOAD_RECENT_BLOGS', payload })
    }
  }

  componentWillReceiveProps(nextProps) {
    var opathname = this.props.location.pathname
    var npathname = nextProps.location.pathname
    this.handle_reload(npathname, opathname)
  }

  componentDidMount() {
    const pathname = this.props.location.pathname
    const hormalizedPath = normalizePathname(pathname)

    if (pathname !== hormalizedPath) {
      return this.redirect(hormalizedPath)
    }

    this.handle_reload(pathname, '')
  }

  filter_blogs(allblogs, pathname) {
    var k = '/blog'
    var path = pathname.substring(k.length, pathname.length)
    var limit = 100
    var count = 0
    var i = 0
    var l = allblogs.length
    var blogs = []
    while (i < l && count < limit) {
      var blog = allblogs[i]
      var pn = blog['prettyname']
      if (pn.indexOf(path) == 0) {
        blogs.push(blog)
        count += 1
      }
      i += 1
    }
    return blogs
  }

  redirect = to => this.props.router.push(to)

  missing() {
    var location = this.props.location.pathname
    console.log(location)
    snserror(location, '404!', 'ds-blog404')
  }

  render() {
    var pathname = this.props.location.pathname
    var pname = pathname.substring(5, pathname.length)
    var osite = this.props.site.toJS()
    var contributors = osite.contributors
    var ocms = this.props.cms.toJS()
    var blogs = ocms['recent_blogs'] || []
    var exact = undefined
    for (var blog of blogs) {
      var pn = blog['prettyname']
      if (pname == pn) {
        exact = blog
      }
    }
    if (exact != undefined) {
      blogs = [exact]
    }
    var blog_state = ocms.blog_state
    if (blog_state == '' || (blog_state == 'loading' && blogs.length == 0)) {
      return <Loading />
    }
    if (blogs.length == 0) {
      this.missing()
      return <NoBlogs />
    }
    if (blogs.length === 1) {
      return (
        <BlogItem
          blog={blogs[0]}
          loading={blog_state === 'loading'}
          updateMeta={this.props.updateMeta}
        />
      )
    } else {
      return (
        <Wrapper>
          <BlogTopNav pathname={pathname} blogs={blogs} />
          <div className="center">
            <BlogList blogs={blogs} contributors={contributors} />
          </div>
        </Wrapper>
      )
    }
  }
}

export default page(
  connect((state, ownProps) => ({
    player: state.player,
    blogs: state.blogs,
    cms: state.cms,
    episodes: state.episodes,
    site: state.site
  }))(BlogRouter),
  {
    title: 'Data Skeptic Blog'
  }
)

const Wrapper = styled.div`
  @media (max-width: 768px) {
    padding: 1.1111111111111112rem;

    .center {
      margin-left: -20px;
      margin-right: -20px;
    }
  }
`
