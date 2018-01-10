import React, { Component } from 'react'
import { connect } from 'react-redux';

import BlogListItem from "./BlogListItem"
import isCtrlOrCommandKey from '../../utils/isCtrlOrCommandKey';

class BlogList extends Component {

    constructor(props) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick(e) {
        if (window) {
            if (!isCtrlOrCommandKey(e)) {
                window.scrollTo(0, 0);
                //this.props.dispatch(removeFocusPost());
            }
        }
    }

    getContributor = (contributor) => {
        contributor = contributor.toLowerCase()
        return this.props.contributors[contributor]
    }

    render() {
    	const { blogs = [], onClick, latestId } = this.props;
        return (
            <div className="row blog-list-container">
                {blogs.map((blog, index) =>
                    <BlogListItem
                        key={index}
                        blog={blog}
                        onClick={this.onItemClick}
                        isLatest={blog.c_hash===latestId}
                        contributor={this.getContributor(blog.author)}
                    />
                )}}
            </div>
        )
    }
}

export default connect(state => ({
    contributors: state.contributors.get('list').toJS()
}))(BlogList)
