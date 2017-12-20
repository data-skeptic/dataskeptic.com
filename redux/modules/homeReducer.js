const LOAD_ALL = 'LOAD_ALL'
const LOAD_ALL_SUCCESS = 'LOAD_ALL_SUCCESS'
const LOAD_ALL_FAIL = 'LOAD_ALL_FAIL'

const initialState = {
    latestEpisode: null,
    latestBlogPost: null,
    dailySponsor: null,
    loading: false,
    error: null,
    loaded: false
};

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_ALL:
            return{
                ...state,
                loading:true
            }
        case LOAD_ALL_SUCCESS:
            return{
                ...state,
                loading:false,
                latestBlogPost:action.result.latestBlog,
                latestEpisode:action.result.latestEpisode,
                dailySponsor:action.result.latestCard,
                loaded: true
            }
        default:
            return state
    }
}

// Action Creators

export const loadAll = () => ({
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: client => client.get('/home')
})

// Selectors
export const getLatestBlogPost = state => state.home && state.home.latestBlogPost;

export const getLatestEpisode = state => state.home && state.home.latestEpisode;

export const getDailySponsor = state => state.home && state.home.dailySponsor;


//Helpers
export const hasHomeData = state => state.home && state.home.loaded




