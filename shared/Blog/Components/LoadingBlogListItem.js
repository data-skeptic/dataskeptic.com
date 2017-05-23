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
	            <div className="blog-summary" key={id}>
                    <div>
                        <span className="blog-date preloader">{date}</span>
                    </div>
	                <Link className="blog-title preloader" to={link}>{title}</Link>
	                <p className="blog-desc preloader">
                        {desc}
                    </p>
	            </div>
            </div>
        )
    }
}

export default LoadingBlogListItem;