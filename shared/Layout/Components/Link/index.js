import React from 'react'
import { Link } from 'react-router'

const wrapClick = fn => {
  window.scrollTo(0, 0)
  fn()
}

export default ({ children, onClick = () => {}, ...rest }) => (
  <Link {...rest} onClick={wrapClick(onClick)}>
    {children}
  </Link>
)
