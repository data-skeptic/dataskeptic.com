import React, { Component , PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Episode from "../Podcasts/Components/Episode"
import MailingList from "../Common/Components/MailingList"
import EpisodePlayer from "./EpisodePlayer"
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
      dispatch({type: "CMS_GET_HOMEPAGE_CONTENT", payload: {dispatch} })
  }

  static getPageMeta() {
      return {
          title: 'Data Skeptic'
      }
  }

  render() {
    var ocms = this.props.cms.toJS()
    var oepisodes = this.props.episodes.toJS()
    var i = 0
    var latest_episode = ocms.latest_episode

    //console.log("guid", guid)
    return (
      <div className="center">
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <HomepageFeature />
          </div>
          <div className="col-xs-12 col-sm-4">
            <EpisodePlayer episode={latest_episode} />
            <MailingList />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default connect(state => ({
    episodes: state.episodes, 
    cms: state.cms
}))(Home)
