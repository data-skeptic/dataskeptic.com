import React, { Component } from "react"
import styled from "styled-components"
import marked from "marked"
import { BOT_ID } from "../../Constants/index"

const getMarkdown = text => {
  const rawMarkup = marked(text)
  return { __html: rawMarkup }
}

const renderText = text => (
  <Text dangerouslySetInnerHTML={getMarkdown(text)} />
)

export default class Message extends Component {
  render() {
    const { text, children, author, sent } = this.props

    return (
      <Container sent={sent}>
        {author && <Author src={author.img} bot={author.author === BOT_ID} />}
        <Bubble sent={sent}>{children ? children : renderText(text)}</Bubble>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  margin-bottom: 12px;

  ${props =>
    props.sent
      ? `
			justify-content: flex-end;
			`
      : `
	    justify-content: flex-start;
			`};
`

const Author = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 15px;
  margin-top: 6px;

  ${props =>
    !props.bot &&
    `
    border-radius: 50%;  
  `};
`

const Bubble = styled.div`
  border-radius: 5px;
  padding: 12px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  word-wrap: break-word;

  * {
    margin: 0px;
    padding: 0px;
    max-width: 100%;
  }

  ${props =>
    props.sent
      ? `
	    background: rgba(240, 217, 67, 0.1);
			`
      : `
			background: #F9FAF9;
	`};
`

const Text = styled.span`

`