import React, { Component } from 'react'
import { Link } from 'react-router'

import BlogListItem from "./BlogListItem"

export default class BlogList extends Component {

    constructor() {
        super();

        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick() {
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    render() {
    	const { blogs = [], onClick } = this.props;

        return (
            <div className="row blog-summary-container">
                {blogs.map((blog, index) => {
                    const id = index;
                    return <BlogListItem key={id} blog={blog} onClick={this.onItemClick}/>
                })}
            </div>
        )
    }
}
