import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { ContentContainer, BlogContainer, PodContainer, ADGoesHere } from './style'
import Feature from './Feature'
import Blog from './Blog'
import Podcast from './Podcast'
import { connect } from 'react-redux'

import { GET_FEATURES, GET_FEATURES_PENDING } from '../../../actions/home'

class Content extends Component {
  static propTypes = {
    pageType: PropTypes.string,
    features: PropTypes.array,
    getFeatures: PropTypes.func
  }

  componentDidMount () {
    const { pageType, getFeatures } = this.props
    getFeatures(pageType)
  }

  componentWillReceiveProps (nextProps) {
    const { features } = nextProps
    console.log('Features nextProps DATA : ', features)
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

function mapStateToProps (state, props) {
  const { features } = state.features
  return { features }
}

function mapDispatchToProps (dispatch, props) {
  return {
    getFeatures: async (pageType) => {
      dispatch({ type: GET_FEATURES_PENDING, payload: pageType })
      const res = await GET_FEATURES(pageType)
      return dispatch(res)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)