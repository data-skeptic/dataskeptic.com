import React, {PropTypes} from 'react'
import {Link} from 'react-router';

const HeaderLoginButton = () => (
    <Link className="btn-open-member-portal" to={'/member'}>
        <div className="menu-member-wrap">
            <div className="menu-member-container">

            </div>
        </div>
    </Link>
)

export default HeaderLoginButton