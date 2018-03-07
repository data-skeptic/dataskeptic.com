import chatbotServer from './chatbot_lib/server/index'
import HelperDialog from './shared/ChatBotNext/_Dialogs/HelperDialog'
import SiteDialog from './shared/ChatBotNext/_Dialogs/SiteDialog'
import SmallTalkDialog from './shared/ChatBotNext/_Dialogs/SmallTalkDialog'
import KyleDialog from './shared/ChatBotNext/_Dialogs/KyleDialog'
import ExitDialog from './shared/ChatBotNext/_Dialogs/ExitDialog'

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
const kyle = new KyleDialog()
const exit = new ExitDialog()
const smalltalk = new SmallTalkDialog()

const dialogs = [helper, site, kyle, smalltalk, exit]

chatbotServer(app, {
  dialogs,
  privateKey,
  greeting
})
