import React, { Component }  from 'react'
import { ContentContainer, BlogContainer, PodContainer, ADGoesHere } from './style'
import Feature from './Feature'
import Blog from './Blog'
import Podcast from './Podcast'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <ContentContainer>
        <Feature />
        <BlogContainer className="col-xs-12 col-sm-12 col-md-7">
          <Blog />
        </BlogContainer>
        <PodContainer className="col-xs-12 col-sm-12 col-md-5">
          <Podcast />
        </PodContainer>
        <ADGoesHere>ad goes here</ADGoesHere>
      </ContentContainer>
    )
  }
}

export default Content