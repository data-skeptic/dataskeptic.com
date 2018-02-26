import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import styled from "styled-components"
import Loading from "../../Common/Components/Loading";

class MembershipDownloads extends Component {
	  renderFiles = (files) =>
      <div>{JSON.stringify(files)}</div>

    componentDidMount() {
      if (!this.props.loggedIn) {
        return this.props.history.push('/login')
      }

	    const { dispatch } = this.props
      this.props.dispatch({ type: 'LOAD_MEMBER_DOWNLOADS', payload:{ dispatch } })
    }

    renderContent() {
      const { downloads: { loaded, list } } = this.props

      if (!loaded) {
        return <Loading />
      }
      return (list.length > 0)
        ? this.renderFiles(list)
        : this.renderEmpty()
    }

    render() {
        const { loggedIn } = this.props

	      if (!loggedIn) return <div/>
        return (
            <Container>
              {this.renderContent()}
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        loggedIn: state.auth.getIn(['loggedIn']),
        downloads: state.memberportal.get('downloads').toJS()
    })
)(MembershipDownloads);

const Container = styled.div`
    margin: 25px auto;
    clear: both;
    max-width: 675px;
`

const PageTitle = styled.h2`
`