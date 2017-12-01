
const LOAD_BLOGS = 'LOAD_BLOGS'
const LOAD_BLOGS_SUCCESSS = 'LOAD_BLOGS_SUCCESSS'
const LOAD_BLOGS_FAIL = 'LOAD_BLOGS_FAIL'

const initialState = {
    loading: false,
    error:false,
    list: null
};

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_BLOGS:
            console.log('blogs ')
            return {
                ...state,
                loading:true
            };
        case LOAD_BLOGS_SUCCESSS:
            return{
                ...state,
                list:action.result
            }
        default:
            return state
    }
}


export const loadBlogList = () => ({
    types: [LOAD_BLOGS, LOAD_BLOGS_SUCCESSS, LOAD_BLOGS_FAIL],
    promise: client => client.get('/api/blogs')
})