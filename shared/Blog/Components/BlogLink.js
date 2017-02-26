import React, { Component } from 'react'
import { Link } from 'react-router'

export default class BlogLink extends Component {
    render() {
    	var onClick = this.props.onClick
        var to = this.props.to
        var active = this.props.active
        var isActive = active == to
        return (
            <Link key={to} onClick={onClick} className="blog-link" to={to}>{this.props.children}</Link>
        );
    }
}

BlogLink.contextTypes = {
    router: React.PropTypes.object
};
