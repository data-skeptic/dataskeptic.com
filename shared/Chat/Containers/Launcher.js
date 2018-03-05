import React, { Component } from "react"
import styled from "styled-components"
import UserInput from "./UserInput"
import Messages from "./Messages"
import {REGULAR_MESSAGE, THINKING_MESSAGE} from "../Constants";

export {BOT_AUTHOR, BOT_ID} from '../Constants'

export default class Launcher extends Component {
  static defaultProps = {
    placeholder: "Send a message...",
    header: "DataSkeptic Bot",
    messages: [],
    onMessage: () => {}
  }

  state = {
    open: false
  }

  close = () => this.setState({ open: false })

  toggle = () =>
    this.setState(prevState => ({
      open: !prevState.open
    }))

	handleMessage = (message) => {
    const {onMessage} = this.props

		onMessage({
      ...message,
      type: REGULAR_MESSAGE
    })
  }

  render() {
    const { open } = this.state
    const { placeholder, header } = this.props
    let { messages } = this.props
    const thinking = true

    if (thinking) {
      messages = [...messages, {type: THINKING_MESSAGE}]
    }

    return (
      <Container>
        <Chat inactive={!open}>
          <Header>
            {header}
            <Close onClick={this.close}/>
          </Header>
	        <Messages messages={messages} />
          <UserInput placeholder={placeholder} onSubmit={this.handleMessage} focused={open}/>
        </Chat>

        <Button onClick={this.toggle}>
          <Icon open={open}>
            <Bot src="/img/chat/bot.png" />
          </Icon>
        </Button>
      </Container>
    )
  }
}

const Container = styled.div``

const Chat = styled.div`
  z-index: 2147482999;
  width: 370px;
  height: calc(100% - 120px);
  min-height: 120px;
  max-height: 590px;
  position: fixed;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0 7px 40px 2px hsla(210, 1%, 58%, 0.3);
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  border-radius: 10px;

  ${props =>
    props.inactive &&
    `
		opacity: 0;
    visibility: hidden;
    bottom: 90px;
  `};
`

const Header = styled.div`
  padding: 14px 30px;
  color: #2d1454;
  border-bottom: 1px solid #e6e6e6;

  color: #5736e1;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: bold;
`

const Close = styled.button`
  position: absolute;
  right: 26px;
  top: 16px;

  background-image: url(/img/chat/close.svg);
  width: 20px;
  height: 20px;
  border: 0px;
  background-position: center center;
  background-size: contain;
  padding: 0px;
`

const Icon = styled.div`
  width: 32px;
  height: 32px;
  transition: 0.3s ease-in-out;
  transform: rotate(0deg) scale(1);
  transition: transform 160ms linear 0ms, opacity linear,
    -webkit-transform linear;

  ${props =>
    props.open &&
    `
      transform: rotate(30deg);
  `};
`

const Button = styled.div`
  z-index: 2147482999;
  position: fixed;
  bottom: 20px;
  right: 20px;

  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  overflow: hidden;
  background: #2d1454;
  transition: box-shadow 80ms ease-in-out, width 0.4s ease 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 0 0 rgba(56, 56, 58, 0.12);

  &:hover {
    box-shadow: 0 1px 1px 0 rgba(56, 56, 58, 0.1),
      0 10px 20px 0 rgba(56, 56, 58, 0.2);
  }
`

const Bot = styled.img`
  width: 100%;
  height: 100%;
`
