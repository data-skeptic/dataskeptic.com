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


## Messages & Dialogs

### Describing custom Dialog
