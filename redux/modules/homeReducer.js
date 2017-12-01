const LOAD_LATEST_BLOGPOST = 'LOAD_LATEST_BLOGPOST'
const  LOAD_LATEST_BLOGPOST_SUCCESS = ' LOAD_LATEST_BLOGPOST_SUCCESS'
const LOAD_LATEST_BLOGPOST_FAIL = 'LOAD_LATEST_BLOGPOST_FAIL'


const LOAD_LATEST_EPISODE = 'LOAD_LATEST_EPISODE'
const LOAD_LATEST_EPISODE_SUCCESS = 'LOAD_LATEST_EPISODE_SUCCESS'
const LOAD_LATEST_EPISODE_FAIL = 'LOAD_LATEST_EPISODE_FAIL'

const LOAD_DAILY_SPONSOR = 'LOAD_DAILY_SPONSOR'
const LOAD_DAILY_SPONSOR_SUCCESS = 'LOAD_DAILY_SPONSOR_SUCCESS'
const LOAD_DAILY_SPONSOR_FAIL = 'LOAD_DAILY_SPONSOR_FAIL'

const initialState = {
    latestEpisode: null,
    latestBlogPost: null,
    dailySponsor: null,
    loading: false,
    error: null
};

const mockData = {
    last: {
        blog: {
            title: "Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft",
            description: "This episode features discussion of database as a service, " +
            "database migration, threat detection, R/python in SQL Server, and use cases",
            media: "https://pbs.twimg.com/profile_images/621906932434010112/QmrnzlMf.jpg",
            author: "Kyle Polich",
            date: "June 12, 2017"
        },
        podcast: {
            title: "Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft",
            description: "This episode features discussion of database as a service, " +
            "database migration, threat detection, R/python in SQL Server, and use cases",
            media: "https://pbs.twimg.com/profile_images/621906932434010112/QmrnzlMf.jpg",
            author: "Kyle Polich",
            date: "June 12, 2017"
        },
        sponsor: {
            name: "Briliant",
            url: "http://brilliant.org/dataskeptics",
            promoText:'',
            img:'',
            date: "June 12, 2017"
        }
    },

}


export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {

        default:
            return state
    }
}

// Action Creators

export const loadLatestBlogPost = () => ({
    types: [LOAD_LATEST_BLOGPOST, LOAD_LATEST_BLOGPOST_SUCCESS, LOAD_LATEST_BLOGPOST_FAIL],
    promise: client => client.get('/episodes')
})
export const loadLatestEpisode = () => ({
    types: [LOAD_LATEST_EPISODE, LOAD_LATEST_EPISODE_SUCCESS, LOAD_LATEST_EPISODE_FAIL],
    promise: client => client.get('/episodes')
})
export const loadDailySponsor = () => ({
    types: [LOAD_DAILY_SPONSOR, LOAD_DAILY_SPONSOR_SUCCESS, LOAD_DAILY_SPONSOR_FAIL],
    promise: client => client.get('/episodes')
})

// Selectors
export const getLatestBlogPost = state => state.home && state.home.latestBlogPost;

export const getLatestEpisode = state => state.home && state.home.latestEpisode;

export const getDailySponsor = state => state.home && state.home.dailySponsor;


//Helpers
export const hasLatestBlogPost = state => state.home && !!state.home.latestBlogPost;

export const hasLatestEpisode = state => state.home && !!state.home.latestEpisode;

export const hasDailySponsor = state => state.home && !!state.home.dailySponsor;



