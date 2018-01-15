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
        console.log('this.props')
        console.log(this.props)
        var latestId = ""
        var blogs = this.props.blogs
        var osite = this.props.site.toJS()
        console.log(osite)
        var contributors = osite.contributors
        var me = this
        return (
            <div className="row blog-list-container">
            {
                blogs.map(function(blog, index) {
                    var contributor = contributors[blog.author]
                    console.log(contributor)
                    return (
                        <BlogListItem
                            key={index}
                            blog={blog}
                            onClick={me.onItemClick}
                            isLatest={blog.c_hash===latestId}
                            contributor={contributor}
                        />
                    )
                })
            }
            </div>
        )
    }
}

export default connect(state => ({
    site: state.site
}))(BlogList)
