import React, { Component } from 'react'
import ChatBotIcon from '../Components/ChatBotIcon/ChatBotIcon'
import ChatBotModal from '../Components/ChatBotModal/ChatBotModal'

class ChatBotContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChatBot: false
    }
    this.showToggle = this.showToggle.bind(this)
  }
  showToggle() {
    const { showChatBot } = this.state
    this.setState({ showChatBot: !showChatBot })
  }

  render() {
    return (
      <div>
        {this.state.showChatBot ? (
          <ChatBotModal closeModal={this.showToggle} />
        ) : (
          <ChatBotIcon showModal={this.showToggle} />
        )}
      </div>
    )
  }
}

export default ChatBotContainer
