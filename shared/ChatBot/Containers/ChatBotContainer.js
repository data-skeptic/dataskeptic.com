import React, {Component} from "react";
import ChatBotIcon from '../Components/ChatBotIcon/ChatBotIcon'
import ChatBotModal from '../Components/ChatBotModal/ChatBotModal'

const BOT_URL = 'http://localhost:5000';

const validOrigins = [
    BOT_URL
]

class ChatBotContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showChatBot: false
        }
        this.showToggle = this.showToggle.bind(this)
        this.listenMessage = this.listenMessage.bind(this)
    }


    componentDidMount() {
        window.addEventListener("message", this.listenMessage);
    }

    componentWillUnmount() {
        window.removeEventListener('message');
    }

    validateOrigin(e) {
        return validOrigins.indexOf(e.origin) > -1;
    }

    postMessage(frame, message, origin)
    {
        frame.postMessage(message, origin);
    }

    listenMessage(e) {
        if (this.validateOrigin(e)){
            this.postMessage(window.frames.chatbotframe, location.href, BOT_URL);
        }
    }


    showToggle() {
        const {showChatBot} = this.state;
        showChatBot && this.postMessage(window.frames.chatbotframe, location.href, BOT_URL);
        this.setState({showChatBot: !showChatBot})
    }

    render() {
        return (
            <div>

                {
                    this.state.showChatBot
                        ? <ChatBotModal closeModal = {this.showToggle}/>
                        : <ChatBotIcon showModal={this.showToggle}/>
                }
            </div>
        );
    }


}

export default ChatBotContainer;
