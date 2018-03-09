import React from 'react'

export const Content = ({ title, children }) => (
  <div className="col-md-8 col-xs-12 page-content">
    {title ? <h2 className="page-content-title">{title}</h2> : null}

    {children}
  </div>
)

export default Content
