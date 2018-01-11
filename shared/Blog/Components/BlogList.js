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

    render() {
    	const { blogs = [], contributors={}, onClick, latestId } = this.props;
        return (
            <div className="row blog-list-container">
                {blogs.map((blog, index) => {
                    var contributor = contributors[blog.author.toLowerCase()]
                    return (
                        <BlogListItem
                            key={index}
                            blog={blog}
                            onClick={this.onItemClick}
                            isLatest={blog.c_hash===latestId}
                            contributor={contributor}
                        />
                    )
                })}
            </div>
        )
    }
}

export default connect(state => ({
    site: state.site
}))(BlogList)
