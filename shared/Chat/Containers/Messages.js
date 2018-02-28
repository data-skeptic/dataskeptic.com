import React, { Component } from "react"
import styled from "styled-components"
import Message from "../Message"

export default class Messages extends Component {
  static defaultProps = {
    messages: []
  }

	componentDidUpdate = () => this.list.scrollTop = this.list.scrollHeight

  render() {
    const { messages } = this.props
    return (
      <Wrapper ref={el => this.list = el}>
        {messages.map((m, index) => <Message key={index} {...m} />)}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 20px 30px 0px;
  overflow-y: scroll;
  flex: 1;
`
