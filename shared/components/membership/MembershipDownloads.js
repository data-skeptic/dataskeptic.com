import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loading from '../../Common/Components/Loading'

const formatLink = (bucket, s3key) =>
  `/api/v1/download?bucket=${bucket}&path=${s3key}`

class MembershipDownloads extends Component {
  renderFile = ({ title, abstract, bucket, s3key }, index) => (
    <File href={formatLink(bucket, s3key)} target="_blank" key={index}>
      <Info>
        <Title>{title}</Title>
        <Abstract>{abstract}</Abstract>
      </Info>
      <DownloadIcon className="glyphicon glyphicon-cloud-download" />
    </File>
  )
  renderFiles = files => <Files>{files.map(this.renderFile)}</Files>
  renderEmpty = () => <Empty>Empty?</Empty>

  componentDidMount() {
    if (!this.props.loggedIn) {
      return this.props.router.push('/login')
    }

    const { dispatch } = this.props
    this.props.dispatch({
      type: 'LOAD_MEMBER_DOWNLOADS',
      payload: { dispatch }
    })
  }

  renderContent() {
    const {
      downloads: { loaded, list }
    } = this.props

    if (!loaded) {
      return <Loading />
    }
    return list.length > 0 ? this.renderFiles(list) : this.renderEmpty()
  }

  render() {
    const { loggedIn } = this.props

    if (!loggedIn) return <div />
    return (
      <Container>
        <PageTitle>Downloads</PageTitle>
        {this.renderContent()}
      </Container>
    )
  }
}

export default connect(state => ({
  loggedIn: state.auth.getIn(['loggedIn']),
  downloads: state.memberportal.get('downloads').toJS()
}))(MembershipDownloads)

const Container = styled.div`
  margin: 25px auto;
  clear: both;
  max-width: 675px;
`

const PageTitle = styled.h4`
  font-size: 32px;
  line-height: 40px;
  color: #3a3b3b;
  display: block;
  padding-bottom: 8px;
`

const Files = styled.div``

const DownloadIcon = styled.div`
  color: #565858;
  width: 40px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
`

const File = styled.a`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #979797;
  padding: 12px 0px;

  opacity: 0.8;
  &:hover {
    border-bottom: 1px solid #979797;
    opacity: 1;

    ${DownloadIcon} {
      visibility: visible;
    }
  }
`

const Info = styled.div`
  flex: 1;
`

const Title = styled.div`
  color: #3a3b3b;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: bold;
`

const Abstract = styled.div`
  padding-top: 12px;
  font-size: 14px;
  line-height: 24px;
  color: #575959;
`

const Empty = styled.div``
