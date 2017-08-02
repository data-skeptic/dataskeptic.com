import React from 'react';

const ChatBotModal = ({closeModal}) =>(
    <div className="chat-bot-modal" >
            <img className="close-modal" src="img/svg/x.svg" alt="close" onClick={closeModal}/>
        <iframe className="chat-bot" src='https://webchat.botframework.com/embed/dataskeptic-bot?s=Sb3ZVnvH-KE.cwA.9cQ.YtBXA1S8J_1jFukakBxyO_zBaY7DXUdDG7DCLj5ean8'>
        </iframe>

</div>
)
export default ChatBotModal;