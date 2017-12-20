import React, {Component} from 'react'
import Page from '../../hoc/Page'
import {loadSingleBlog} from "../../redux/modules/blogReducer";
import BlogPost from '../../modules/Blogs/Containers/BlogSingle'

@Page
export default class BlogDetails extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const {category, year, name} = query;
        const prettyName = `${category}/${year}/${name}`
        const promises = []

        promises.push(dispatch(loadSingleBlog(prettyName)))

        await Promise.all(promises)
    }

    render() {
        return <BlogPost />
    }
}
