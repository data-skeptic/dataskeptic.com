import React, { Component } from 'react';
import { Link } from 'react-router'

class NavLink extends Component {
    render() {
        var to = this.props.to
        var active = this.props.active
        var isActive = active == to
        var className = isActive ? "menu-active" : "menu-inactive";
        console.log(this.props)
        return (
            <li className={className}>
                <Link to={to}>{this.props.children}</Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object
};

export default NavLink;