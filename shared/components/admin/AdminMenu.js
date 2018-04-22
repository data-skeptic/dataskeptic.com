import React, { Component } from 'react'
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
                  <li>
                    <Link to="/admin/cms/pending">CMS pending</Link>
                  </li>
                  <li>
                    <Link to="/admin/cms/recent">CMS recent</Link>
                  </li>
                  <li>
                    <Link to="/admin/cms/contributors/add">Add Contributor</Link>
                  </li>
                  <li>
                    <Link to="/admin/cms/feature">Homepage</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <a>Orders</a>

            <div className="fulldrop">
              <div className="column">
                <ul>
                  <li>
                    <Link to="/admin/orders/new">Recent</Link>
                  </li>
                  <li>
                    <Link to="/admin/orders/processing">Add Order</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <a>Email</a>

            <div className="fulldrop">
              <div className="column">
                <ul>
                  <li>
                    <Link to="/admin/emails/send">Send</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <a>Analytics</a>
            <div className="fulldrop">
              <div className="column">
                <ul>
                  <li>
                    <Link to="/admin/tse">Time Series Analysis</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <a>Careers</a>
            <div className="fulldrop">
              <div className="column">
                <ul>
                  <li>
                    <Link to="/admin/job/add">Add Job</Link>
                  </li>
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
