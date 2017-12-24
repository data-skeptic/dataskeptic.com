import React, { Component , PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Slider from "react-slick"

import Episode from "../Podcasts/Components/Episode"
import MailingList from "../Common/Components/MailingList"
import LatestEpisodePlayer from "../Blog/Containers/LatestEpisodePlayer"
import HomepageFeature from "./HomepageFeature"
import BlogContainer from 'Blog/Routes/BlogContainer'

import {changePageTitle} from '../Layout/Actions/LayoutActions';
import {get_homepage_content} from '../utils/redux_loader'

class Home extends Component {

  componentWillMount() {
      var dispatch = this.props.dispatch;
      get_homepage_content(dispatch);

      const {title} = Home.getPageMeta();
      dispatch(changePageTitle(title));
  }

  static getPageMeta() {
      return {
          title: 'Data Skeptic'
      }
  }

  render() {
    var oepisodes = this.props.episodes.toJS()
    var oblogs = this.props.blogs.toJS()
    var i = 0
    console.log("lsss", oepisodes)
    var guid = undefined

    console.log("guid", guid)
    return (
      <div className="center">
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <HomepageFeature />
          </div>
          <div className="col-xs-12 col-sm-4">
            <LatestEpisodePlayer guid={guid} />
            <MailingList />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default connect(state => ({
    episodes: state.episodes, blogs: state.blogs,
    cardContent: state.advertise.getIn(['card'])
}))(Home)
