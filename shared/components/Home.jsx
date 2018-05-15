import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MailingList from '../Common/Components/MailingList'

import { changePageTitle } from '../Layout/Actions/LayoutActions'

import HomeContainer from '../../shared/Home'
import { parseQuery } from '../utils/parseQuery'
import EmailPopup from "../Popups/Containers/EmailPopup";
import {toggle} from "../Popups/helpers/popup";

class Home extends Component {
  static getPageMeta() {
    return {
      title: 'Data Skeptic'
    }
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    const { title } = Home.getPageMeta()
    dispatch(changePageTitle(title))

    if (!this.props.cms.get('home_loaded')) {
      dispatch({
        type: 'CMS_GET_HOMEPAGE_CONTENT',
        payload: { dispatch }
      })

      const query = parseQuery(this.props.location.search)
      const location = query.location
      dispatch({
        type: 'CMS_GET_HOMEPAGE_JOB_LISTING',
        payload: { dispatch, location }
      })
    }
  }

  render() {
    var ocms = this.props.cms.toJS()
    var latest_episode_blog = ocms.latest_episode
    var guid = latest_episode_blog['guid']
    var oepisodes = this.props.episodes.toJS()
    var ep_map = oepisodes.ep_map
    var latest_episode = ep_map[guid]
    return (
      // <div className="center">
      //   <div className="row">
      //     <div className="col-xs-12 col-sm-8">
      //       <HomepageFeature />
      //     </div>
      //     <div className="col-xs-12 col-sm-4">
      //        <EpisodePlayer episode={latest_episode} />
      //        <MailingList />
      //     </div>
      //   </div>
      //   <div className="clear"></div>
      // </div>
      <div>
        <button onClick={this.props.dispatch(toggle('email'))}>email</button>
        <EmailPopup />

        <HomeContainer />
        <div className="clear" />
        <div className="home-mailing-list-outer">
          <div className="home-mailing-list-container">
            <MailingList />
          </div>
          <div className="clear" />
        </div>
        <br />
        <br />
      </div>
    )
  }
}

export default connect(state => ({
  episodes: state.episodes,
  cms: state.cms
}))(Home)
