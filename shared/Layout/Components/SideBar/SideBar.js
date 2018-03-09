import React, { PropTypes } from 'react'

export const Sidebar = ({ children, title }) => (
  <div className="col-md-offset-1 col-md-3 col-xs-12 page-sidebar">
    <h3>{title}</h3>
    <div className="inner">{children}</div>
  </div>
)

export default Sidebar
