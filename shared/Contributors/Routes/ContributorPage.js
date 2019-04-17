import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { changePageTitle } from '../../Layout/Actions/LayoutActions'
import NotFound from '../../NotFound/Components/NotFound'
import { Link } from 'react-router'
import marked from 'marked'
import moment from 'moment/moment'
import { get_contributor_posts } from '../../utils/redux_loader'
import Loading from '../../Common/Components/Loading'
import page from '../../Layout/hoc/page'

const markdown = text => {
  const rawMarkup = marked(text)
  return { __html: rawMarkup }
}

const getContributorInfo = (contributor = '', contributors) =>
  contributors && contributors[contributor.toLowerCase()]

const renderTwitter = twitter => (
  <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
)
const renderLinkedin = linkedin => <a href={linkedin}>LinkedIn</a>

const renderBio = bio => <Bio dangerouslySetInnerHTML={markdown(bio)} />

const formatDate = date => moment(date).format('MMMM D, Y')

const MAX_POSTS_COUNT = 20

const renderPostsCount = count =>
  count > MAX_POSTS_COUNT ? `${MAX_POSTS_COUNT}+` : count

class ContributorPage extends Component {
  componentWillMount() {
    const contributor = getContributorInfo(
      this.props.params.contributor,
      this.props.contributors
    )
    let title = 'Not Found'
    if (!contributor) {
      this.missing()
    } else {
      const { prettyname, posts } = contributor
      title = `${prettyname}`

      if (!posts) {
        get_contributor_posts(
          this.props.dispatch,
          this.props.params.contributor
        )
      }
    }

    this.props.updateMeta({
      title
    })
  }

  missing() {
    const location = this.props.location.pathname
    console.log(location)
  }

  renderPosts(posts) {
    return posts.map(
      ({ title, abstract, prettyname, publish_date, related }, i) => {
        const preview =
          related && related.filter(r => r.type === 'homepage-image')[0]
        return (
          <Post key={i} to={`/blog${prettyname}`}>
            {preview && (
              <Preview>
                <img src={preview.dest} alt={title} />
              </Preview>
            )}
            <Inner indent={!!preview}>
              <Date>{formatDate(publish_date)}</Date>
              <Title>{title}</Title>
              <Abstract>{abstract}</Abstract>
            </Inner>
          </Post>
        )
      }
    )
  }

  render() {
    const contributor = getContributorInfo(
      this.props.params.contributor,
      this.props.contributors
    )

    if (!contributor) {
      return <NotFound location={this.props.location} />
    }

    const {
      prettyname,
      img,
      twitter,
      linkedin,
      bio,
      posts,
      postsLoaded
    } = contributor

    return (
      <Container>
        <About>
          <Avatar src={img} height={64} width={64} />
          <Name>{prettyname}</Name>
        </About>
        {renderBio(bio)}
        <Navigation>
          <Item line={true}>
            <Category>Posts</Category>
            <Value>{posts ? renderPostsCount(posts.length) : '–'}</Value>
          </Item>
          {twitter && (
            <Item line={true}>
              <Category>Twitter</Category>
              <Value>{renderTwitter(twitter)}</Value>
            </Item>
          )}
          {linkedin && (
            <Item>
              <Category>Linkedin</Category>
              <Value>{renderLinkedin(linkedin)}</Value>
            </Item>
          )}
        </Navigation>
        <Blogs>
          {!postsLoaded && <Loading />}
          {posts && this.renderPosts(posts)}
        </Blogs>
      </Container>
    )
  }
}

const Container = styled.div`
  margin: 25px auto;
  clear: both;
  max-width: 675px;
`

const About = styled.section`
  display: flex;
  flex-direction: columns;
  align-items: center;
  padding: 0px 15px;
`

const Name = styled.h2`
  margin: 0px;
  padding: 10px 20px;
`

const Avatar = styled.img`
  border-radius: 50%;
  padding: 4px;
  background-color: #ffffff;
  border: 1px solid #dddddd !important;
`

const Bio = styled.p`
  padding: 15px;
  line-height: 24px;
`

const Navigation = styled.div`
  display: flex;
  flex-direction: columns;
  align-items: center;
  height: 50px;
  margin: 10px 0px;
`

const Item = styled.div`
  ${props => props.line && `border-right: 1px solid #eee;`} margin: 25px 15px;
  padding: 15px 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  flex: 1;
`

const Category = styled.div`
  font-weight: bold;
  font-size: 80%;
  text-transform: uppercase;
`

const Value = styled.div``

const Blogs = styled.div`
  padding: 15px;
`

const Post = styled(Link)`
  display: flex;
  flex-direction: row;
  padding: 25px 0px;
  border-bottom: 1px solid #eee;
  color: #333;

  &:hover {
    color: #000;
    border-bottom-color: #eee;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Preview = styled.div`
  min-width: 200px;
  max-width: 400px;

  flex-basis: auto;
  flex-grow: 1;
  text-align: center;

  img {
    margin: 4px 0px;
    max-width: 80%;
  }

  @media (max-width: 768px) {
    min-width: 400px;
    max-width: 400px;
  }
`

const Inner = styled.div``

const Title = styled.h4`
  font-weight: normal;
  margin: 0px 0px 12px 0px;
`

const Date = styled.div`
  margin: 4px 0px;
  font-weight: bold;
  font-size: 90%;
  color: #7d8080;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Abstract = styled.div`
  margin: 8px 0px;
  line-height: 24px;
`

export default page(
  connect(state => ({
    contributors: state.site.get('contributors').toJS()
  }))(ContributorPage),
  {
    title: 'Contributor Page'
  }
)
