import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MailingList from '../Common/Components/MailingList'

import HomeContainer from '../../shared/Home'
import { parseQuery } from '../utils/parseQuery'
import page from '../Layout/hoc/page'

class Home extends Component {
  componentWillMount() {
    const dispatch = this.props.dispatch

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

export default page(connect(state => ({ cms: state.cms }))(Home), {
  title: 'Data Skeptic'
})
