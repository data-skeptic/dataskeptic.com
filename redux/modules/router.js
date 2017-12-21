const ROUTING_INIT = 'ROUTING_INIT'
const ROUTING_START = 'ROUTING_START'
const ROUTING_COMPLETE = 'ROUTING_COMPLETE'

const initialState = {
    routing: false
}

export default function reducer(state = initialState,
                                action = {}) {
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
export const routingInit = () => ({type: ROUTING_INIT})
export const routingStart = (from, to) => ({
    type: ROUTING_START,
    from,
    to
})

export const routingComplete = () => ({type: ROUTING_COMPLETE})

// Selectors
export const isRouting = (state) => state.router.routing
export const isRoutingToDifferentPage = (state) =>
    state.router.routing && state.router.from !== state.router.to.split('?')[0]
