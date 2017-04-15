import React, { Component } from 'react'
import { connect } from 'react-redux';

import BlogListItem from "./BlogListItem"
import { removeFocusPost } from '../../Blog/Actions/BlogsActions';

class BlogList extends Component {

    constructor() {
        super();

        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick() {
        if (window) {
            window.scrollTo(0, 0);
            this.props.dispatch(removeFocusPost());
        }
    }

    render() {
    	const { blogs = [], onClick, latestId } = this.props;

        return (
            <div className="row blog-summary-container">
                {blogs.map((blog, index) => {
                    return <BlogListItem key={index} blog={blog} onClick={this.onItemClick} isLatest={blog.c_hash===latestId}/>
                })}
            </div>
        )
    }
}

export default connect(state => ({  }))(BlogList)
