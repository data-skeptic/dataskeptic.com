import React, { Component } from 'react'
import { Link } from 'react-router'

import BlogListItem from "./BlogListItem"

export default class BlogList extends Component {
    render() {
        var onClick = this.props.onClick
    	var blogs = this.props.blogs
        return (
            <div class="row blog-summary-container">
                {blogs.map(function(blog) {
                    return <BlogListItem onClick={onClick} key={blog.uri} blog={blog} />
                })}
            </div>
        )
    }
}
