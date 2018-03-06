import dialogHandler from './dialog' 
import {ON_MESSAGE_REPLY, ON_MESSAGE_SENT} from "../shared/events";
import {replyMessage} from "../client/reducer";

const handleLogic = (socket) => {
  const reply = (message) => {
    console.log('ON_MESSAGE_REPLY', ON_MESSAGE_REPLY)
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

if (!module.parent) {
  console.log(`Waiting for new chat connections`)
  const PORT = process.env.CHAT_PORT || 9004
  const app = require('http').createServer((req, res) => {
    res.writeHead(200)
    res.end(JSON.stringify({ success: true }))
  })

  console.log('[CHATBOT]', `Server listening on :${PORT}`)
  app.listen(PORT).on('error', (e) =>{
    console.log('[CHATBOT]', 'Got error')
    console.error(e.message)
  })
  
  run(app)
}

export default run
