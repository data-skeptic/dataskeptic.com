import React, { Component } from "react"
import styled from "styled-components"
import marked from "marked"

const getAuthorImage = author => {
  author = author.toLowerCase()
  switch (author) {
    case "kyle":
      return "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.jpg"
    default:
      return "/img/chat/bot.png"
  }
}

const getMarkdown = text => {
  const rawMarkup = marked(text, { sanitize: true })
  return { __html: rawMarkup }
}

export default class Message extends Component {
  render() {
    const { text, author, sent } = this.props

    return (
      <Container sent={sent}>
        {author && (
          <Author src={getAuthorImage(author)} bot={author === "bot"} />
        )}
        <Text
          sent={sent}
          dangerouslySetInnerHTML={getMarkdown(text)}
        />
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

const Text = styled.span`
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
