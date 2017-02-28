import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import className from 'classnames';

export const NavLink = ({onClick, to, isActive, children}) => (
    <div className="navlink-li-container">
        <Link to={to} onClick={onClick} className={ className({'menu-active': isActive, 'menu-inactive': !isActive}) }>
            <span>{children}</span>
        </Link>
    </div>
);

NavLink.propTypes = {
    onClick: PropTypes.func,
    to: PropTypes.string,
    children: PropTypes.node
};

export default NavLink;