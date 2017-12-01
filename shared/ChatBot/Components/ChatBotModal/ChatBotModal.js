import React from 'react';

const c = require('./config/config.json')
console.dir('env = ' + env)
bot_embed_code = c[env]['bot']['embed_code']

const ChatBotModal = ({closeModal}) => (
    <div className="chat-bot-modal">
        <div className="bot-wrapper">
            <i className="fa fa-times close-modal" aria-hidden="true" onClick={closeModal}></i>
            <iframe className="chat-bot"
                    src='https://webchat.botframework.com/embed/dataskeptic-bot?s={bot_embed_code}'>
            </iframe>
        </div>

    </div>
)
export default ChatBotModal;