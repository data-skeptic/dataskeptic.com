import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

class MembershipDownloads extends Component {
    componentDidMount() {
      if (!this.props.loggedIn) {
        return this.props.history.push('/login')
      }
    }

    render() {
        const { user, loggedIn } = this.props
        return (
            <div className="member-portal-container">
              downloads
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn']),
        memberportal: state.memberportal,
    })
)(MembershipDownloads);
