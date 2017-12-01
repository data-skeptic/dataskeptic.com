const LOAD_ALL = 'LOAD_ALL';
const LOAD_ALL_SUCCESS = 'LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'LOAD_ALL_FAIL';

const initialState = {
  latestEpisode:null,

};

const mockData = {
    last: {
       blog:{
            title: "Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft",
            description: "This episode features discussion of database as a service, " +
            "database migration, threat detection, R/python in SQL Server, and use cases",
            media: "https://pbs.twimg.com/profile_images/621906932434010112/QmrnzlMf.jpg",
            author: "Kyle Polich",
            date: "June 12, 2017"
       },
        podcast:{
            title: "Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft",
            description: "This episode features discussion of database as a service, " +
            "database migration, threat detection, R/python in SQL Server, and use cases",
            media: "https://pbs.twimg.com/profile_images/621906932434010112/QmrnzlMf.jpg",
            author: "Kyle Polich",
            date: "June 12, 2017"
        },
        sponsor:{
            name: "Briliant",
            url: "http://brilliant.org/dataskeptics",
            date: "June 12, 2017"
        }
    },

}


export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_ALL_SUCCESS:
            return {
                ...state,
                list: action.result
            };
        default:
            return state
    }
}

// Action Creators
export const loadCards = () => {
    return {
        type: LOAD_ALL_SUCCESS,
        result:
    }
};



// Selectors
export const getCards = (state) =>
    state.homeReducer && state.homeReducer.list;


// Helpers
export const hasCards = (state) =>
    state.homeReducer && !!state.homeReducer.list;





