import React, {Component} from 'react'
import { Link } from 'react-router'

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
                                    <li><Link to="/admin/cms/pending">CMS pending</Link></li>
                                    <li><Link to="/admin/cms/recent">CMS recent</Link></li>
                                    <li><Link to="/admin/cms/feature">Feature of the week</Link></li>
                                    <li><Link to="/admin/cms/add_related">Add Related Content</Link></li>
                                    <li><Link to="/admin/cms/recent_related">Recent Related Content</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a>Orders</a>

                        <div className="fulldrop">
                            <div className="column">
                                <ul>
                                    <li><Link to="/admin/orders/new">New</Link></li>
                                    <li><Link to="/admin/orders/processing">Processing</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a>Email</a>

                        <div className="fulldrop">
                            <div className="column">
                                <ul>
                                    <li><Link to="/admin/emails/send">Send</Link></li>
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