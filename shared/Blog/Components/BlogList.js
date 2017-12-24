import React, { Component } from 'react'
import { connect } from 'react-redux';

import BlogListItem from "./BlogListItem"
import { removeFocusPost } from '../../Blog/Actions/BlogsActions';

import isCtrlOrCommandKey from '../../utils/isCtrlOrCommandKey';

class BlogList extends Component {

    constructor() {
        super();

        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick(e) {
        if (window) {
            if (!isCtrlOrCommandKey(e)) {
                window.scrollTo(0, 0);
                this.props.dispatch(removeFocusPost());
            }
        }
    }

    render() {
    	const { blogs = [], onClick, latestId } = this.props;
        return (
            <div className="center">
                <div className="row blog-summary-container">
                    {blogs.map((blog, index) => {
                        return <BlogListItem key={index} blog={blog} onClick={this.onItemClick} isLatest={blog.c_hash===latestId}/>
                    })}
                </div>
            </div>
        )
    }
}

export default connect(state => ({  }))(BlogList)
