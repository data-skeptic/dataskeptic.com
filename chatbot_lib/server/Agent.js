import { fromJS, empty } from './Session'

// TODO:: rewrite as class
export default socket => ({
  getSession() {
    return socket.session || empty
  },
  saveSession(data) {
    socket.session = fromJS(data)
  },
  on(event, fn) {
    socket.on(event, fn)
  },
  emit(type, data) {
    const action = {
      type,
      payload: data
    }

    this.reply(action)
  },
  triggerAction(action) {
    const { type } = action
    socket.emit(type, action)
  }
})
