import React, { Component } from 'react'
import { Link } from 'react-router'

class LoadingBlogListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {id, link, title, date, desc} = this.props;

        return (
            <div className="col-xs-12">
                <div className="blog-summary">
                    <div>
                        <span className="blog-date preloader">{date}</span>
                    </div>
                    <div className="media">
                        <div className="media-left contributor-preview preloader">
                            <img width="80" height="80" src="/img/blank.gif"/>
                        </div>
                        <div className="media-body">
                            <a className="blog-title media-heading preloader">{title}</a>
                            <p className="by"><span className="preloader">by <b>{'Kyle Polich'}</b></span></p>
                        </div>
                    </div>
                    <p className="blog-desc preloader">
                        {desc}
                    </p>
                </div>
            </div>
        )
    }
}

export default LoadingBlogListItem;