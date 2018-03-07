// TODO:: rewrite as class

export default (socket) => ({
  getSession() {
    return socket.session
  },
  saveSession(data) {
    socket.session = data
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
    const {type} = action
    socket.emit(type, action)
  }
})
