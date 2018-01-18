import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { ContentContainer, BlogContainer, PodContainer } from './style'
import Feature from './Feature'
import Blog from './Blog'
import Podcast from './Podcast'
import { connect } from 'react-redux'

import { GET_FEATURES, GET_FEATURES_PENDING } from '../../../actions/home'
import { get_contributors }  from '../../daos/serverInit'

let featured_blog = {}
let blogList = []
let latest_episode = {}

class Content extends Component {
  static propTypes = {
    pageType: PropTypes.string,
    features: PropTypes.object,
    getFeatures: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      twitterAuthor: null
    }
  }

  componentDidMount () {
    const { pageType, getFeatures } = this.props
    getFeatures(pageType)
  }

  componentWillReceiveProps (nextProps) {
    const { features } = nextProps
    blogList = []
    featured_blog = features.featured_blog
    console.log('featured_blog -- homepage', featured_blog)
    blogList.push(features.featured_2)
    blogList.push(features.featured_3)
    latest_episode = features.latest_episode
  }

  render () {
    var that = this
    if ( featured_blog !== undefined) {
      console.log('AUTHOR : ', featured_blog)
      if ( featured_blog.author !== undefined ) {
        if ( this.state.twitterAuthor === null) {
          var author = featured_blog.author.toLowerCase();
          var promise = get_contributors()
          promise.then(function(contributors) {
            console.log('Contributors : ', contributors)
            var contentKeys = Object.keys(contributors);
            for ( var i=0; i<contentKeys.length; i++) {
              if ( contributors[contentKeys[i]].author === author ) {
                that.setState({twitterAuthor: contributors[contentKeys[i]]})
                console.log('testsetsetetsetes', this.state.twitterAuthor)
                break
              }
            }
          })
        }
      }
    }
    return (
      <ContentContainer>
        <Feature feature_blog={featured_blog} twitterAuthor={this.state.twitterAuthor}/>
        <BlogContainer className="col-xs-12 col-sm-12 col-md-7">
          <Blog blogList={blogList}/>
        </BlogContainer>
        <PodContainer className="col-xs-12 col-sm-12 col-md-5">
          <Podcast latest_episode={latest_episode}/>
        </PodContainer>
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