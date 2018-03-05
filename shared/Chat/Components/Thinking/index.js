import React, { Component } from "react"
import styled from "styled-components"
import marked from "marked"
import Message from "../Message";

export default class Thinking extends Component {

	renderState() {
		return <div>...</div>
	}

  render() {
    const { ...rest } = this.props
		const sent = false

    return (
      <Message {...rest} sent={sent} >
	      {this.renderState()}
      </Message>
    )
  }
}

const Container = styled.div`
  display: flex;
  margin-bottom: 12px;
`