const run = server => {
  const io = require('socket.io')(server)
  console.log(`Waiting for new chat connections`)

  io.on('connection', function(socket) {
    console.log('a user connected')
  })
}

if (!module.parent) {
  console.log(`Waiting for new chat connections`)
  const PORT = process.env.CHAT_PORT || 9002
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
