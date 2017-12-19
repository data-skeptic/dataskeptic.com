const LOAD_BLOGS = 'LOAD_BLOGS'

const initialState = {
    user: null
};

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {

        default:
            return state
    }
}


//Selectors

//Helpers

export const getUser = (state) => state.auth.user