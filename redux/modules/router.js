// @flow
import type { Action } from './types'

const ROUTING_INIT = 'trueup-employer/router/ROUTING_INIT'
const ROUTING_START = 'trueup-employer/router/ROUTING_START'
const ROUTING_COMPLETE = 'trueup-employer/router/ROUTING_COMPLETE'

type State = {
  routing: boolean
}

type GlobalState = {
  router: State,
  from?: string,
  to?: string
}

const initialState: State = {
  routing: false
}

export default function reducer(
  state: State = initialState,
  action: Action = {}
): State {
  switch (action.type) {
    case ROUTING_START:
      return {
        routing: true,
        from: action.from,
        to: action.to
      }
    case ROUTING_COMPLETE:
      return {
        routing: false
      }
    default:
      return state
  }
}

// Action Creators
export const routingInit = (): Action => ({ type: ROUTING_INIT })
export const routingStart = (from: string, to: string): Action => ({
  type: ROUTING_START,
  from,
  to
})
export const routingComplete = (): Action => ({ type: ROUTING_COMPLETE })

// Selectors
export const isRouting = (state: GlobalState): boolean => state.router.routing
export const isRoutingToDifferentPage = (state: GlobalState): boolean =>
  state.router.routing && state.router.from !== state.router.to.split('?')[0]
