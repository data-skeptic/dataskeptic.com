import React, { Component } from 'react'
import { Link } from 'react-router'

export default class BlogLink extends Component {
    render() {
        var to = this.props.to
        var active = this.props.active
        var isActive = active == to
        return (
            <Link key={to} class="blog-link" to={to}>{this.props.children}</Link>
        );
    }
}

BlogLink.contextTypes = {
    router: React.PropTypes.object
};
