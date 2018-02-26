import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

class MembershipDownloads extends Component {
    componentDidMount() {
      if (!this.props.loggedIn) {
        return this.props.history.push('/login')
      }

      this.props.dispatch({ type: 'LOAD_MEMBER_DOWNLOADS' })
    }

    render() {
        const { downloads } = this.props
        const { loaded, loading, list } = downloads
        return (
            <div className="member-portal-container">
              {JSON.stringify(downloads)}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        loggedIn: state.auth.getIn(['loggedIn']),
        downloads: state.memberportal.get('downloads').toJS()
    })
)(MembershipDownloads);
