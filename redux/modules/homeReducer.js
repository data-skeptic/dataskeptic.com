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

export const loadLatestBlogPost = () => ({})
export const loadLatestEpisode = () => ({})
export const loadDailySponsor = () => ({})

// Selectors
export const getLatestBlogPost = state => state.home && state.home.latestBlogPost;

export const getLatestEpisode = state => state.home && state.home.latestEpisode;

export const getDailySponsor = state => state.home && state.home.dailySponsor;


//Helpers
export const hasLatestBlogPost = state => state.home && !!state.home.latestBlogPost;

export const hasLatestEpisode = state => state.home && !!state.home.latestEpisode;

export const hasDailySponsor = state => state.home && !!state.home.dailySponsor;



