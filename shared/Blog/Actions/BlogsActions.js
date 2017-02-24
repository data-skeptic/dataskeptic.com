import axios from 'axios';

export const LOAD_BLOGS_REQUEST = 'LOAD_BLOGS_REQUEST';
export const LOAD_BLOGS_SUCCESS = 'LOAD_BLOGS_SUCCESS';
export const LOAD_BLOGS_FAILED = 'LOAD_BLOGS_FAILED';
export const LOAD_BLOG_POST_REQUEST = 'LOAD_BLOG_POST_REQUEST';
export const LOAD_BLOG_POST_SUCCESS = 'LOAD_BLOG_POST_SUCCESS';
export const LOAD_BLOG_POST_FAILED = 'LOAD_BLOG_POST_FAILED';

export function loadBlogs(pathname) {
    return (dispatch) => {
        debugger;
        const url = "/api" + pathname;
        return axios.get(url)
            .then((result) => { dispatch(loadBlogsSuccess(result)) })
            .catch((err) => { dispatch(loadBlogsFailed(err)) })
    }
}

export function loadBlogsRequest() {
    return {
        type: LOAD_BLOG_POST_REQUEST
    }
}

export function loadBlogsFailed(error) {
    return {
        type: LOAD_BLOG_POST_FAILED,
        error
    }
}

export function loadBlogsSuccess(data) {
    return {
        type: LOAD_BLOG_POST_SUCCESS,
        payload: data
    }
}