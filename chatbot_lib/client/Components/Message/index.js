import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import marked from 'marked'
import { BOT_ID } from '../../constants'

const getMarkdown = text => {
  const rawMarkup = marked(text)
  return { __html: rawMarkup }
}

const renderText = text => <Text dangerouslySetInnerHTML={getMarkdown(text)} />

export default class Message extends Component {
  render() {
    const { text, children, author, sent } = this.props

    return (
      <Container sent={sent}>
        {author && <Author src={author.img} bot={author.author === BOT_ID} />}
        
        <Content>
          {text && <Bubble sent={sent}>{renderText(text)}</Bubble>}
          {(text && children) && <Spacer />  }
          {children}
        </Content>
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
  margin-top: 6px;

  ${props =>
    !props.bot &&
    `
    border-radius: 50%;  
  `};
`

const content = css`
  margin-left: 15px;
  display: inline-block;
  max-width: 100%;
  min-width: 40px;
  overflow: hidden;
`

const Content = styled.div`
  ${content};
`

const Spacer = styled.div`
  margin-top: 12px;
`

const Bubble = styled.div`
  border-radius: 5px;
  padding: 12px;
  word-wrap: break-word;

  * {
    margin: 0px;
    padding: 0px;
    max-width: 100%;
  }
  
  mark[type=exit] {
    border: 1px solid #d7d9d9;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    padding: 1px 4px;
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

const Text = styled.span``
