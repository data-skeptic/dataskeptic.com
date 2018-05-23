import React from 'react'
import { Link } from 'react-router'

const wrapClick = (fn, e) => {
  window.scrollTo(0, 0)
  fn(e)
}

export default ({ children, onClick = () => {}, ...rest }) => (
  <Link {...rest} onClick={(e) => wrapClick(onClick, e)}>
    {children}
  </Link>
)
