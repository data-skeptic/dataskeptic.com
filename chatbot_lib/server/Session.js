export default class Session {
  
  constructor() {
    this.data = {}
    this.handler = null
  }
  
  fromJS(obj = {}) {
    this.data = obj
  }
  
  toJS() {
    return {
      ...this.data
    }
  }
  
  getAttribute(key) {
    return this.data[key]  
  }
  
  setAttribute(key, val) {
    this.data[key] = val
  }
  
  updateAttribute(key, val) {
    this.setAttribute(key, val)
  }
  
  clearAttribute(key) {
    this.setAttribute(key, null)
  }
  
  get(...keys) {
    const values = keys.map(key => this.getAttribute(key))
    
    if (arguments.length === 1) {
      return values[0]
    }
    
    return values
  }
  
  set(key, val) {
    return this.setAttribute(key, val)
  }

  resetHandler() {
    this.handler = null
  }
  
  setHanlder(handler) {
    this.handler = handler
  }
  
}

export const fromJS = (data) => {
  const session = new Session()
  session.fromJS(data)
  return session
}

export const empty = fromJS({})
