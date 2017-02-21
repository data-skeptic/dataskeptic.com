import React, { Component } from 'react'
import { Link } from 'react-router'

import BlogListItem from "./BlogListItem"

export default class BlogList extends Component {
    render() {
    	var blogs = this.props.blogs || []
        return (
            <div className="row blog-summary-container">
                {blogs.map(function(blog, index) {
                    const id = index;
                    return <BlogListItem key={id} blog={blog} />
                })}
            </div>
        )
    }
}
