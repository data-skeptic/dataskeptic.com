import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactDisqusComments from 'react-disqus-comments'
import snserror from '../../SnsUtil'
import EpisodePlayer from '../../components/EpisodePlayer'
import MailingListBlogFooter from './MailingListBlogFooter'
import RelatedContent from './RelatedContent'
import BlogBreadCrumbs from './BlogBreadCrumbs'
import BlogAuthorTop from './BlogAuthorTop'
import BlogAuthorBottom from './BlogAuthorBottom'
import BlogShareBar from './BlogShareBar'
import Loading from '../../Common/Components/Loading'
import { isEmpty } from 'lodash'

const INJECTABLE_PARAGRAPH = 2

const insertAt = (str, pos, injStr) =>
  str.slice(0, pos) + injStr + str.slice(pos)

const injectImage = (content, preview) => {
  const injectedImage = `
			<img src="${
        preview.dest
      }" style="float: left;margin: 4px 10px 0px 0px;max-width: 70%;">
		`

  const reg = /<\/p>/g
  let match = reg.exec(content)
  for (let i = 1; i < INJECTABLE_PARAGRAPH; i++) {
    match = reg.exec(content)
  }

  const at = match ? match.index + 4 : 0

  return insertAt(content, at, injectedImage)
}

const wrapTables = content => {
  const wrapperStart = '<div class="ds_table"><table'
  const tableStart = /<table/g

  const wrapperEnd = '</table></div>'
  const tableEnd = /<\/table>/g

  return content.replace(tableStart, wrapperStart).replace(tableEnd, wrapperEnd)
}

const renderTopContributors = (contributors = []) => (
  <By>
    <AuthorsTop>
      {contributors.map((contributor, index) => (
        <BlogAuthorTop
          {...contributor}
          isFirst={index === 0}
          isLast={index === contributors.length - 1}
          key={contributor.contributor_id}
        />
      ))}
    </AuthorsTop>
  </By>
)

const renderBottomContributors = (contributors = []) => (
  <div>
    {contributors.map(contributor => (
      <BlogAuthorBottom {...contributor} key={contributor.contributor_id} />
    ))}
  </div>
)

class BlogItem extends Component {
  static defaultProps = {
    updateMeta: () => {}
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    var blog = this.props.blog
    var src_file = blog.src_file
    dispatch({
      type: 'CMS_LOAD_BLOG_CONTENT',
      payload: { src_file, dispatch }
    })
  }

  handleNewComment(comment) {
    console.log(comment.text)
    snserror('Blog comment', comment.text, 'ds-newblog')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) return
    
    const src_file = this.props.blog.src_file
    const hasContent = !isEmpty(nextProps.cms.getIn([`blog_content`, src_file]))
    
    if (hasContent) {
      const title = nextProps.blog.title
      const description = nextProps.blog.abstract

      const meta = {
        title,
        description
      }
      
      this.props.updateMeta(meta)
    }
  }

  render() {
    var osite = this.props.site.toJS()
    var ocms = this.props.cms.toJS()
    var oepisodes = this.props.episodes.toJS()
    var disqus_username = osite.disqus_username
    var blog = this.props.blog
    var loading = this.props.loading
    var author = blog['author']
    var prettyname = blog.prettyname
    var src_file = blog.src_file
    var content = ocms.blog_content[src_file]
    console.log(loading, src_file, content === undefined)
    if (content === undefined || loading) {
      console.log('Waiting for content to load')
      return <Loading />
    }
    var related_items = blog.related
    var contributors = osite.contributors
    var contributor = contributors[author.toLowerCase()]
    var url = 'http://dataskeptic.com/blog' + prettyname
    if (prettyname.indexOf('/episodes/') === 0) {
      contributor = undefined
    }
    var title = blog['title']
    var top = <div />
    var bot = <div />
    var guid = blog.guid
    if (guid) {
      var episode = undefined
      for (var ep of oepisodes.episodes) {
        if (ep.guid == guid) {
          episode = ep
        }
      }
      top = <EpisodePlayer episode={episode} />
    } else {
      let related_mp3_items = related_items.filter(item => item.type === 'mp3')
      if (related_mp3_items.length > 0) {
        const item_data = related_mp3_items[0] // hope it only one
        let mp3_item = {
          img:
            'https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg',
          num: item_data['blog_id'],
          guid: item_data['content_id'],
          pubDate: blog['publish_date'],
          mp3: item_data['dest'],
          desc: item_data['body'],
          duration: item_data['duration'],
          title: item_data['title'],
          link: 'https://dataskeptic.com/blog/' + prettyname
        }

        top = (
          <div>
            <EpisodePlayer episode={mp3_item} />
          </div>
        )
      }
    }

    var shareUrl = url
    var exampleImage =
      'https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg'
    if (!guid && contributor && contributor.img) {
      exampleImage = contributor.img
    }

    const preview =
      related_items && related_items.filter(r => r.type === 'homepage-image')[0]
    if (preview) {
      content = injectImage(content, preview)
    }

    content = wrapTables(content)

    const multipleContributors =
      blog.contributors && blog.contributors.length > 0
    if (!multipleContributors && contributor) {
      blog.contributors = [contributor]
    }

    return (
      <Wrapper>
        <BlogBreadCrumbs prettyname={prettyname} exampleImage={exampleImage} />
        {renderTopContributors(blog.contributors)}
        {top}
        <Content dangerouslySetInnerHTML={{ __html: content }} />
        <RelatedContent items={related_items} />
        <BlogShareBar
          shareUrl={shareUrl}
          title={title}
          exampleImage={exampleImage}
        />
        {renderBottomContributors(blog.contributors)}
        {bot}
        <MailingListBlogFooter />
        <ReactDisqusComments
          shortname={disqus_username}
          identifier={url}
          title={title}
          url={url}
          onNewComment={this.handleNewComment}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin: auto;
  clear: both;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1.1111111111111112rem 1.6666666666666667rem 1.1111111111111112rem;
  }
`

const By = styled.section`
  padding: 22px 0px 0px 0px;
  display: flex;
  align-items: center;
`

const AuthorsTop = styled.div`
  margin-left: -0.3em;
  display: flex;
`

const Content = styled.article`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    color: #3a3b3b;
  }

  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 30px;
  }

  > p {
    font-size: 1.1em;
    line-height: 1.6em;
  }

  img {
    max-width: 100%;
  }

  pre {
    border: 0px;
    color: #000;
    background: rgba(27, 31, 35, 0.05);
    text-shadow: 0 1px #fff;
    font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    border-radius: 5px;
    font-size: 90%;

    > code {
      background: transparent !important;
    }
  }

  code {
    background: transparent;
    border-radius: 5px;
    line-height: 1.2rem;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    color: #000;
    font-size: 90%;
  }

  .ds_table {
    max-width: 100%;
    overflow: scroll;
    position: relative;
    margin-top: 24px;
    margin-bottom: 24px;

    background: #f4f4f4;
    border: 1px solid #eee;

    table {
      border: none;

      thead {
        overflow-x: scroll;
        background: #f4f4f4;
        font-weight: bold;
        color: #2e1453;
        border-bottom: 1px solid #eee;

        th {
          padding: 0px 4px;
          color: #38383a;
          padding: 0.2em 0.4em;
          text-transform: uppercase;
        }
      }

      tbody {
        overflow-x: scroll;
        background: transparent;

        tr:nth-child(even) {
          background: #f1f1f1;
        }

        tr:nth-child(odd) {
          border-top: 1px solid #eee;
          background: #fff;
        }
      }

      td {
        padding: 0.2em 0.4em;
      }
    }
  }
`

export default connect(state => ({
  site: state.site,
  cms: state.cms,
  episodes: state.episodes,
  blogs: state.blogs
}))(BlogItem)
