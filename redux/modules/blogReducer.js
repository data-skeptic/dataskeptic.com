
const LOAD_BLOGS = 'LOAD_BLOGS'
const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS'
const LOAD_BLOGS_FAIL = 'LOAD_BLOGS_FAIL'

const LOAD_BLOG = 'LOAD_BLOG'
const LOAD_BLOG_SUCCESS = 'LOAD_BLOG_SUCCESS'
const LOAD_BLOG_FAIL = 'LOAD_BLOG_FAIL'

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
const LOAD_CATEGORIES_FAIL = 'LOAD_CATEGORIES_FAIL'

const initialState = {
    loading: false,
    error:false,
    list: null,
    single:null,
    categories:null
};

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_BLOGS:
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
                  single:action.result
            }
        case LOAD_CATEGORIES:
            return{
                ...state,
                loading:true
            }
        case LOAD_CATEGORIES_SUCCESS:
            return{
                ...state,
                categories:action.result
            }
        default:
            return state
    }
}


export const loadBlogList = () => ({
    types: [LOAD_BLOGS, LOAD_BLOGS_SUCCESS, LOAD_BLOGS_FAIL],
    promise: client => client.get('/blogs')
})
export const loadSingleBlog = id =>({
    types: [LOAD_BLOG, LOAD_BLOG_SUCCESS, LOAD_BLOG_FAIL],
    promise: client => client.get(`/blogs/${id}`)
})
export const loadCategories = () =>({
    types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
    promise: client => client.get(`/categories`)
})

//Selectors

export const getBlogList = state => state.blogs && state.blogs.list

export const getSingle = state => state.blogs && state.blogs.single

export const getCategories = state => state.blogs && state.blogs.categories

export const hasBlogs = state => state.blogs && !!state.blogs.list

export const hasCategories = state => state.blogs && !!state.blogs.categories