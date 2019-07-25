import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import popup from '../hoc/popup'
import MailingList from '../../Common/Components/MailingList'

export const KEY = `email`
export const DELAY = 300

class EmailPopup extends Component {
  render() {
    const { onClose } = this.props

    return (
      <Inner>
        <Bot>
          <img
            src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
            width="120"
          />
        </Bot>
        <Container>
          <MailingList
            id={'popup'}
            onSubmit={(e, { success }) => {
              if (success) setTimeout(onClose, DELAY)
            }}
            heading={`Sign up for our mailing list and don't miss any updates`}
          />
        </Container>
      </Inner>
    )
  }
}

export default connect((state, ownProps) => ({}))(
  popup(EmailPopup, {
    key: KEY,
    height: '360px',
    width: '430px',
    message: "Sign up for our mailing list and don't miss any updates",
    callToAction: 'Subscribe'
  })
)

const Inner = styled.div``
const Bot = styled.div`
  display: flex;
  justify-content: center;

  img {
    margin-top: -90px;
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    img {
      margin-top: 0px;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  padding: 20px;
`
