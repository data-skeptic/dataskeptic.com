import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import isUndefined from 'lodash/isUndefined'
import styled from 'styled-components'
import { redirects_map } from '../../../redirects'
import { get_podcasts_by_guid } from '../../utils/redux_loader'
import { snserror } from '../../SnsUtil'

import NotFound from '../../NotFound/Components/NotFound'
import BlogTopNav from '../Components/BlogTopNav'
import BlogItem from '../Components/BlogItem'
import BlogList from '../Components/BlogList'
import BlogBreadCrumbs from '../Components/BlogBreadCrumbs'
import NoBlogs from '../Components/NoBlogs'
import Loading from '../../Common/Components/Loading'
import transform_pathname from '../../utils/transform_pathname'

const normalizePathname = path => path.replace(/\/\//g, '/')

class BlogRouter extends React.Component {
  constructor(props) {
    super(props)
  }

  static getPageMeta(state) {
    const isExists = state.blogs.getIn(['blog_focus', 'blog'])
    if (!isExists) {
      return {
        title: 'Data Skeptic',
        description: ''
      }
    }

    const post = state.blogs.getIn(['blog_focus', 'blog']).toJS()
    const isEpisode = !isUndefined(post.guid)

    let meta = {
      //title: `${post.title} | Data Skeptic`,
      title: `Data Skeptic`,
      description: post.desc
    }

    if (isEpisode) {
      meta.image = post.preview
    }

    return meta
  }

  handle_reload(pathname, oldpathname) {
    console.log('handle_reload of ' + pathname + ' over ' + oldpathname)
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
      console.log('Exact match')
      console.log(blogs.length)
      if (blogs.length != 1) {
        var blogs = [exact]
        var prefix = pname
        var payload = { blogs, prefix }
        console.log(['CMS_SET_RECENT_BLOGS', blogs])
        dispatch({ type: 'CMS_SET_RECENT_BLOGS', payload: payload })
      } else if (blogs[0]['blog_id'] != exact['blog_id']) {
        request_reload = true
      }
    }
    if (request_reload) {
      console.log('Asking blogs to reload')
      var payload = { limit: 10, offset: 0, prefix: pname, dispatch }
      var loaded_prettyname = ocms.loaded_prettyname
      dispatch({ type: 'CMS_LOAD_RECENT_BLOGS', payload })
    }
    //const {title} = BlogRouter.getPageMeta(this.props);
    //dispatch(changePageTitle(title));
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
    // ????
    //var redirect = redirects_map[pathname]
    //if (redirect) {
    //  pathname = redirect
    //}
    var k = '/blog'
    var path = pathname.substring(k.length, pathname.length)
    console.log('inject_blog router path=' + path)
    var limit = 100
    var count = 0
    var i = 0
    var l = allblogs.length
    console.log('l=' + l)
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
    console.log('BlogRouter render ' + pathname)
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
      console.log('exact match')
      blogs = [exact]
    }
    var blog_state = ocms.blog_state
    if (blog_state == '' || (blog_state == 'loading' && blogs.length == 0)) {
      console.log('blog_state', blog_state)
      return <Loading />
    }
    if (blogs.length == 0) {
      console.log('NO BLOGS IN MEMORY!')
      this.missing()
      return <NoBlogs />
    }
    if (blogs.length == 1) {
      console.log('One to show')
      return <BlogItem blog={blogs[0]} loading={blog_state === 'loading'} />
    } else {
      console.log('BlogList')
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

export default connect((state, ownProps) => ({
  player: state.player,
  blogs: state.blogs,
  cms: state.cms,
  episodes: state.episodes,
  site: state.site
}))(BlogRouter)

const Wrapper = styled.div`
  @media (max-width: 768px) {
    padding: 1.1111111111111112rem;

    .center {
      margin-left: -20px;
      margin-right: -20px;
    }
  }
`
