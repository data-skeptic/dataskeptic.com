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
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

const initialState = {
    loading: false,
    error: false,
    list: null,
    single: null,
    categories: null,
    activeCategory: 'all',
    total: null,
    perPage: 10,
    currentPage: null,
    lastPage: null,
    from: null,
    to: null
};

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_BLOGS:
            return {
                ...state,
                loading: true
            };
        case LOAD_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.result.posts,
                total:action.result.total,
                currentPage:action.result.currentPage,
                lastPage:action.result.lastPage,
                from:action.result.from,
                to:action.result.to
            }
        case LOAD_BLOG:
            return {
                ...state,
                loading: true
            }
        case LOAD_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                single: action.result
            }
        case LOAD_CATEGORIES:
            return {
                ...state,
                loading: true
            }
        case LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.result
            }
        case SET_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: action.payload.prettyName
            }
      case SET_CURRENT_PAGE:
          return {
            ...state,
            currentPage: action.payload.page
          }
        default:
            return state
    }
}


export const loadBlogList = currentPage => ({
    types: [LOAD_BLOGS, LOAD_BLOGS_SUCCESS, LOAD_BLOGS_FAIL],
    promise: client => client.get(`/blogs/${currentPage && currentPage}`)
})
export const loadSingleBlog = pn => ({
    types: [LOAD_BLOG, LOAD_BLOG_SUCCESS, LOAD_BLOG_FAIL],
    promise: client => client.get(`/blogs/${pn}`)
})
export const loadCategories = () => ({
    types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
    promise: client => client.get(`/categories`)
})
export const setActiveCategory = prettyName => ({
    type: SET_ACTIVE_CATEGORY,
    payload: {
        prettyName
    }
})

export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE,
  payload: {
      page
  }
})

//Selectors

export const getBlogList = state => state.blogs && state.blogs.list

export const getSingle = state => state.blogs && state.blogs.single

export const getCategories = state => state.blogs && state.blogs.categories

export const getActiveCategory = state => state.blogs && state.blogs.activeCategory

export const getPageCount = state => state.blogs && state.blogs.total && Math.ceil(state.blogs.total/10)

//Helpers

export const hasBlogs = state => state.blogs && !!state.blogs.list

export const hasCategories = state => state.blogs && !!state.blogs.categories