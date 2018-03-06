import dialogHandler from './dialog' 
import {ON_MESSAGE_REPLY, ON_MESSAGE_SENT} from "../shared/events";
import {replyMessage} from "../client/reducer";

const handleLogic = (socket) => {
  const reply = (message) => {
    socket.emit(ON_MESSAGE_REPLY, replyMessage(message))
  }
  
  socket.on(ON_MESSAGE_SENT, (data) => dialogHandler(data, reply))
}

const run = server => {
  const io = require('socket.io')(server)
  console.log(`Waiting for new chat connections`)

  io.on('connection', function(socket) {
    console.log('a user connected')
    handleLogic(socket)
  })
}

export default run
