const LOAD_EPISODES = 'LOAD_EPISODES'
const LOAD_EPISODES_SUCCESS = 'LOAD_EPISODES_SUCCESS'
const LOAD_EPISODES_FAIL = 'LOAD_EPISODES_FAIL'


const initialState = {
    loading:false,
    error:false,
    episodes: null,
    single: null,
    years:null,
}

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_EPISODES:
            return{
                ...state,
                loading:true
            }
        case LOAD_EPISODES_SUCCESS:
            return{
                ...state,
                episodes:action.result
            }
        default:
            return state
    }
}


export const loadEpisodesList = () => ({
    types: [LOAD_EPISODES, LOAD_EPISODES_SUCCESS, LOAD_EPISODES_FAIL],
    promise: client => client.get('/episodes')
})


//Selectors
