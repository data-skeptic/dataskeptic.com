
const LOAD_BLOGS = 'LOAD_BLOGS'
const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS'
const LOAD_BLOGS_FAIL = 'LOAD_BLOGS_FAIL'

const LOAD_BLOG = 'LOAD_BLOG'
const LOAD_BLOG_SUCCESS = 'LOAD_BLOG_SUCCESS'
const LOAD_BLOG_FAIL = 'LOAD_BLOG_FAIL'

const initialState = {
    loading: false,
    error:false,
    list: null,
    single:null
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
        case LOAD_BLOGS_SUCCESS:
            return{
                ...state,
                loading:false,
                list:action.result
            }
        case LOAD_BLOG:
            return{
                ...state,
                loading:true
            }
        case LOAD_BLOG_SUCCESS:
            return{
                ...state,
                loading:false,
                  single:action.return
            }
        default:
            return state
    }
}


export const loadBlogList = () => ({
    types: [LOAD_BLOGS, LOAD_BLOGS_SUCCESSS, LOAD_BLOGS_FAIL],
    promise: client => client.get('/blogs')
})
export const loadSilgleBlog = id =>({
    types: [LOAD_BLOG, LOAD_BLOG_SUCCESS, LOAD_BLOG_FAIL],
    promise: client => client.get(`/blogs/${id}`)
})