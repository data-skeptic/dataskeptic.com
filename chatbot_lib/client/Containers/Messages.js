import React, { Component } from 'react'
import styled from 'styled-components'

import { THINKING_MESSAGE } from '../../shared/messageTypes'
import Message from '../Components/Message'
import Thinking from '../Components/Thinking'

export default class Messages extends Component {
  static defaultProps = {
    messages: []
  }

  componentDidUpdate = () => (this.list.scrollTop = this.list.scrollHeight)

  renderMessage = (message, index) => {
    let Renderer

    switch (message.type) {
      case THINKING_MESSAGE:
        Renderer = Thinking
        break

      default:
        Renderer = Message
    }

    return <Renderer key={index} {...message} />
  }

  render() {
    const { messages } = this.props
    return (
      <Wrapper innerRef={el => (this.list = el)}>
        {messages.map(this.renderMessage)}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 20px 30px 0px;
  overflow-y: auto;
  flex: 1;
`
