import chatbotServer from './chatbot_lib/server/index'

import bot from './shared/Chatbot/Dialogs/BotDialog'

const PORT = process.env.CHAT_PORT || 9004
const app = require('http').createServer((req, res) => {
  console.log('[CHATBOT]', `Server listening on :${PORT}`)
  console.log(`Waiting for new chat connections`)
  res.writeHead(200)
  res.end(JSON.stringify({ success: true }))
})

app.listen(PORT).on('error', e => {
  console.log('[CHATBOT]', 'Got error')
  console.error(e.message)
})

/**
 * Conversations handlers
 */

const privateKey = 'DATAS'

const greeting = (session, reply) => {
  reply({
    text: ` 👋 What would you like to talk about?`
  })
}

const dialogs = [bot]

chatbotServer(app, {
  dialogs,
  privateKey,
  greeting
})
