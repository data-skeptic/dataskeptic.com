import React, { Component } from 'react'
import { Link } from 'react-router'

import className from 'classnames';

export default class BlogLink extends Component {
    render() {
        const { isActive, onClick, to } = this.props;

        return (
            <Link key={to} onClick={onClick} className={ className('blog-link', {'active': isActive}) } to={to}>{this.props.children}</Link>
        );
    }
}

BlogLink.contextTypes = {
    router: React.PropTypes.object
};
