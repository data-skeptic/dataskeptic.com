import React, { Component } from 'react'
import { Link } from 'react-router'

class NavLink extends Component {
    render() {
        var onClick = this.props.onClick
        var to = this.props.to
        var active = this.props.active
        var isActive = active == to
        var className = isActive ? "menu-active" : "menu-inactive";
        return (
            <div className="navlink-li-container">
                <li className={className}>
                    <Link to={to} onClick={onClick}>{this.props.children}</Link>
                </li>
            </div>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object
};

export default NavLink;