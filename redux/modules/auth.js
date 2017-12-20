const INIT = 'INIT'
export const INIT_SUCCESS = 'INIT_SUCCESS'
const INIT_FAIL = 'INIT_FAIL'

const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'

const initialState = {
    ready: null,
    user: null
};

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                ready: true,
                user: action.result.user
            }

        case LOGOUT:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null
            }

        default:
            return state
    }
}


//Selectors
export function init() {
    return {
        types: [INIT, INIT_SUCCESS, INIT_FAIL],
        promise: client => client.get('/auth/currentUser')
    }
}

export function logout() {
    return {
        types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
        promise: client => client.get('/auth/logout')
    }
}
//Helpers

export const getUser = state => state.auth && state.auth.user

export const isReady = state => state.auth && state.auth.ready