import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../../Common/Components/Loading'
import { Link } from 'react-router'
import MembershipHeader from './MembershipHeader'

import page from '../../Layout/hoc/page'
import withUser from '../../Layout/hoc/withUser'

class MembershipAnalytics extends Component {
  componentDidMount() {
    var dispatch = this.props.dispatch
    dispatch({ type: 'LOAD_MEMBER_ANALYTICS', payload: { dispatch } })
  }

  render() {
    const { user, loggedIn } = this.props
    var omembership = this.props.memberportal.toJS()
    var analytics = omembership['analytics']
    if (!analytics || analytics.length == 0) {
      return <Loading />
    }
    return (
      <div className="member-portal-container">
        <MembershipHeader user={user} />

        <div className="members-corner">
          <h3>Analytics</h3>
          <p>
            The data below gives some insight into how popular recent entries of
            the blog have performed. This is the percentage of sessions that
            have visited each page in the last 7 days.
          </p>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <b>Page</b>
                  </th>
                  <th>
                    <b>Session Share</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((blogrow, index) => {
                  var pagePath = blogrow.pagePath
                  var session_share =
                    Math.floor(blogrow.session_share * 100 * 100) / 100
                  return (
                    <tr>
                      <td>
                        <Link to={pagePath}>{pagePath}</Link>
                      </td>
                      <td>{session_share}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default withUser(
  page(
    connect(state => ({
      memberportal: state.memberportal
    }))(MembershipAnalytics),
    {
      title: `Analytics`
    }
  )
)
