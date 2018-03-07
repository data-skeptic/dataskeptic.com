import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import Message from "../Message/index"

export default class Thinking extends Component {
  renderState() {
    return (
      <Container>
        <Dot order={0} />
        <Dot order={1} />
        <Dot order={0} />
      </Container>
    )
  }

  render() {
    const { ...rest } = this.props
    const sent = false

    return (
      <Message {...rest} sent={sent}>
        {this.renderState()}
      </Message>
    )
  }
}

const jumpStep = 4

const jump = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  
  10% {
    transform: translateY(-${jumpStep / 2}px);
  }
  
  25% {
    transform: translateY(-${jumpStep}px);
  }
	  
  40% {
    transform: translateY(-${jumpStep / 2}px);
  }
  
  50% {
    opacity: 0.5;
    transform: translateY(0px);
  }
 
  60% {
    transform: translateY(${jumpStep / 2}px);
  }
  
  75% {
    transform: translateY(${jumpStep}px);
  }
  
  90% {
    transform: translateY(${jumpStep / 2}px);
  }
	 
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  min-width: 40px;
  justify-content: space-around;
  align-items: center;
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;

  animation: ${jump} 0.9s ease-out infinite;
  animation-delay: ${props => props.order}s;
`
