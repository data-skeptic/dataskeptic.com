import Router from 'next/router'
import { routingStart, routingComplete } from '../modules/router'

export default function routerMiddleware() {
  let listening
  return store => next => action => {
    if (process.browser && !listening) {
      Router.onRouteChangeStart = url => {
        if (Router.paused) {
          throw new Error('Abort route: paused')
        }
        return next(routingStart(Router.pathname, url))
      }
      Router.onRouteChangeComplete = () => next(routingComplete())
      Router.onRouteChangeError = () => next(routingComplete())
      listening = true
    }
    return next(action)
  }
}
