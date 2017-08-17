import React from 'react';

const BOT_URL = 'http://localhost:5000';

const ChatBotModal = ({closeModal}) => (
    <div className="chat-bot-modal">
        <div className="bot-wrapper">
            <i className="fa fa-times close-modal" aria-hidden="true" onClick={closeModal}></i>
            <iframe className="chat-bot"
                    name="chatbotframe"
                    //src='https://webchat.botframework.com/embed/dataskeptic-bot?s=Sb3ZVnvH-KE.cwA.9cQ.YtBXA1S8J_1jFukakBxyO_zBaY7DXUdDG7DCLj5ean8'>
                      src={`${BOT_URL}/bot.htm`}>
        </iframe>
        </div>

    </div>
)
export default ChatBotModal;