Installation Redux 

```
combineReducers({
  form: formReducer,
  ...reducers
})

const store = applyMiddleware(...middlewares, chatBotMiddleware)(createStore)(
``` 
