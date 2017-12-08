const LOAD_BLOGS = 'LOAD_BLOGS'
const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS'
const LOAD_BLOGS_FAIL = 'LOAD_BLOGS_FAIL'

const LOAD_BLOG = 'LOAD_BLOG'
const LOAD_BLOG_SUCCESS = 'LOAD_BLOG_SUCCESS'
const LOAD_BLOG_FAIL = 'LOAD_BLOG_FAIL'

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
const LOAD_CATEGORIES_FAIL = 'LOAD_CATEGORIES_FAIL'
const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

const initialState = {
    loading: false,
    error:false,
    list: null,
    single:null,
    categories:null,
    activeCategory:'all'
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
                list:action.result.posts
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
        case SET_ACTIVE_CATEGORY:
            return{
                ...state,
                activeCategory:action.payload.prettyName
            }
        default:
            return state
    }
}


export const loadBlogList = () => ({
    types: [LOAD_BLOGS, LOAD_BLOGS_SUCCESS, LOAD_BLOGS_FAIL],
    promise: client => client.get('/blogs')
})
export const loadSingleBlog = pn =>({
    types: [LOAD_BLOG, LOAD_BLOG_SUCCESS, LOAD_BLOG_FAIL],
    promise: client => client.get(`/blogs/${pn}`)
})
export const loadCategories = () =>({
    types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
    promise: client => client.get(`/categories`)
})
export const setActiveCategory = prettyName => ({
    type:SET_ACTIVE_CATEGORY,
    payload:{
        prettyName
    }
})

//Selectors

export const getBlogList = state => state.blogs && state.blogs.list

export const getSingle = state => state.blogs && state.blogs.single

export const getCategories = state => state.blogs && state.blogs.categories

export const getActiveCategory = state => state.blogs && state.blogs.activeCategory

//Helpers

export const hasBlogs = state => state.blogs && !!state.blogs.list

export const hasCategories = state => state.blogs && !!state.blogs.categories