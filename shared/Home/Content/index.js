import React, { Component } from 'react'
import { ContentContainer, BlogContainer, PodContainer } from './style'
import Feature from './Feature'
import Blog from './Blog'
import Podcast from './Podcast'
import JobListing from './JobListing'
import PollQuestion from './Poll/PollQuestion'
import PollResult from './Poll/PollResult'
import { connect } from 'react-redux'

class Content extends Component {
  getContributor = ({ author = '' }) =>
    this.props.contributors && this.props.contributors[author.toLowerCase()]

  render() {
    const { featured_2, featured_3, featured_blog, latest_episode, isViewResult } = this.props
    const blogList = [featured_2, featured_3]
    return (
      <ContentContainer>
        <Feature
          feature_blog={featured_blog}
          author={this.getContributor(featured_blog)}
        />
        <BlogContainer className="col-xs-12 col-sm-12 col-md-7">
          <Blog blogList={blogList} getContributor={this.getContributor} />
        </BlogContainer>
        <PodContainer className="col-xs-12 col-sm-12 col-md-5">
          <Podcast
            latest_episode={latest_episode}
            getContributor={this.getContributor}
          />
          <PollQuestion/>
          {isViewResult &&
          <PollResult/>
          }
          <JobListing />
        </PodContainer>
      </ContentContainer>
    )
  }
}

export default connect(state => ({
  home_loaded: state.cms.get('home_loaded'),
  featured_blog: state.cms.get('featured_blog').toJS(),
  featured_2: state.cms.get('featured_blog2').toJS(),
  featured_3: state.cms.get('featured_blog3').toJS(),
  latest_episode: state.cms.get('latest_episode').toJS(),
  contributors: state.site.get('contributors').toJS(),
  isViewResult: state.poll.get('isViewResult')
}))(Content)
