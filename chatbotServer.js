import chatbotServer from './chatbot_lib/server/index'
import HelperDialog from "./shared/ChatBotNext/Dialogs/HelperDialog";
import SiteDialog from "./shared/ChatBotNext/Dialogs/SiteDialog";
import SmallTalkDialog from "./shared/ChatBotNext/Dialogs/SmallTalkDialog";

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
    text: `What would you like to talk about?`
  })
}


const helper = new HelperDialog()
const site = new SiteDialog()
const smalltalk = new SmallTalkDialog()

const dialogs = [
  helper,
  site,
  smalltalk
]

chatbotServer(app, {
  dialogs,
  privateKey,
  greeting
})
