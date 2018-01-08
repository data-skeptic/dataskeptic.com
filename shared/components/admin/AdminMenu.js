import React, {Component} from 'react'

class AdminMenu extends Component {

    render() {
        return (
            <div className="adminMenu">
                <ul className="nav">
                    <li className="dropdown">
                        <a>CMS</a>

                        <div className="fulldrop">
                            <div className="column">
                                <ul>
                                    <li><a href="#">CMS pending</a></li>
                                    <li><a href="#">CMS recent</a></li>
                                    <li><a href="#">Feature of the week</a></li>
                                    <li><a href="#">Add Related Content</a></li>
                                    <li><a href="#">Recent Related Content</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a>Orders</a>

                        <div className="fulldrop">
                            <div className="column">
                                <ul>
                                    <li><a href="#">New</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a>Email</a>

                        <div className="fulldrop">
                            <div className="column">
                                <ul>
                                    <li><a href="#">Send</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }

}

export default AdminMenu