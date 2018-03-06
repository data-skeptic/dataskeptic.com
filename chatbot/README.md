# Installation 

## Client

### Middleware 
#### 1. Reducer

Add chatbot reducer

```
combineReducers({
  bot: chatBotReducer,
  ...reducers
})
```

#### 2. Middleware
 
Apply chatbot connector middleware
```
let store = applyMiddleware(chatBotMiddleware)(
  createStore
)(reducer)
```

#### Ordering
If you are using transform-class-properties, make sure that transform-decorators-legacy comes before transform-class-properties.

```
/// WRONG
let store = applyMiddleware(thunk, promiseMiddleware, chatBotMiddleware)(
  createStore
)(reducer)

/// RIGHT
let store = applyMiddleware(thunk, chatBotMiddleware, promiseMiddleware)(
  createStore
)(reducer)
```

###  Launcher Instance
Create chatbot `Launcher` connected to the redux store.
 
```
const ChatBotLauncher = reduxChatBot({
  id: 'chatbot',
  placeholder: "Send a message...",
  header: "Chatbot Name",
  operators: [],
})(Launcher)
```

## Server

Simple server example

```angular
import chatbotServer from './chatbot/server'

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

chatbotServer(app)
```

# Configuration

## 

## Messages & Dialogs

### Describing custom Dialog

