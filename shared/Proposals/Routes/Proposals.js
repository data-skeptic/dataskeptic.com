import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import marked from 'marked'
import {
  fetchCurrentProposal,
  proposalDeadlineReached,
  authorize
} from '../Actions/ProposalsActions'

import Container from '../../Layout/Components/Container/Container'
import Content from '../../Layout/Components/Content/Content'
import CommentBoxFormContainer from '../Containers/CommentBoxContainer/CommentBoxFormContainer'
import Countdown from '../../Common/Components/Countdown'
import { changePageTitle } from '../../Layout/Actions/LayoutActions'

class Proposals extends Component {
  constructor(props) {
    super(props)
    this.deadline = this.deadline.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.getAuthorizedUser = this.getAuthorizedUser.bind(this)

    this.state = {
      authorizedUser: null,
      ready: false
    }
  }

  static getPageMeta() {
    return {
      title: 'Request for Comment | Data Skeptic'
    }
  }

  componentWillMount() {
    const { title } = Proposals.getPageMeta()
    this.props.changePageTitle(title)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.state.authorizedUser) {
      this.setState({ ready: true })
    }
  }

  componentDidMount() {
    this.getAuthorizedUser()
  }

  login() {
    window.location.href = '/api/v1/auth/login/google/'
  }
  logout() {
    window.location.href = '/api/v1/auth/logout/'
  }

  getAuthorizedUser() {
    const { user } = this.props
    if (user && user.hasAccess) {
      try {
        this.setState({ authorizedUser: user })
      } catch (e) {}
    }
  }

  getMarkdown(text) {
    const rawMarkup = marked(text, { sanitize: true })
    return { __html: rawMarkup }
  }

  deadline() {
    this.props.proposalDeadlineReached()
  }

  render() {
    const { ready, authorizedUser } = this.state
    
    if (this.props.children) {
      return this.props.children
    }

    if (ready) {
      const { proposal = {}, aws_proposals_bucket } = this.props
      const { topic, long_description, deadline, active } = proposal
      const to = moment(deadline)
      const isClosed = !active

      const user = {
        email: authorizedUser.email,
        name: authorizedUser.displayName
      }

      return (
        <div
          className={classNames('proposals-page', {
            closed: isClosed,
            open: !isClosed
          })}
        >
          <Container>
            <Content>
              <div class="row">
                <div className="col-xs-12 col-md-8 countdown-wrapper">
                  {deadline ? (
                    <p className="deadline">
                      <b>Time to comment:</b>
                      <Countdown
                        to={to.toString()}
                        onDeadlineReached={this.deadline}
                      />
                    </p>
                  ) : null}
                </div>
                <div className="col-xs-12 col-md-4 log-out-wrapper">
                  <button className="btn" onClick={this.logout}>
                    <i className="glyphicon glyphicon-arrow-left" />Log out
                  </button>
                </div>
              </div>

              <div class="row">
                {!isClosed && (
                  <div className="col-xs-12">
                    <span className="rfc-title">
                      <b>Topic:</b> {topic}
                    </span>
                    <p
                      dangerouslySetInnerHTML={this.getMarkdown(
                        `${long_description}`
                      )}
                    />
                  </div>
                )}

                {isClosed ? (
                  <div className="col-xs-12 panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        The last Request For Comment has closed
                      </h3>
                    </div>
                    <div className="panel-body">
                      We don't have any active topics. Please check back soon
                      when we launch the next!
                    </div>
                  </div>
                ) : (
                  <CommentBoxFormContainer
                    user={user}
                    aws_proposals_bucket={aws_proposals_bucket}
                  />
                )}
              </div>
            </Content>
          </Container>
        </div>
      )
    } else {
      return (
        <div className="proposals-page">
          <Container>
            <div className="login-container">
              <h2>Welcome to the Data Skeptic</h2>
              <h3>Request For Comment System</h3>
              <p>
                This is the login to an invite-only browser based recording
                system<br />
                where you can share your thoughts on a chosen topic. Your
                comments<br />
                are likely to be included in a future episode of Data Skeptic.
              </p>
              <button onClick={this.login} className="btn btn-primary">
                Login
              </button>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </Container>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    aws_proposals_bucket: state.proposals.getIn(['aws_proposals_bucket']),
    proposal: state.proposals.getIn(['proposal']).toJS(),
    user: state.auth.getIn(['user']).toJS()
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchCurrentProposal,
        proposalDeadlineReached,
        changePageTitle,
        authorize
      },
      dispatch
    )
)(Proposals)
