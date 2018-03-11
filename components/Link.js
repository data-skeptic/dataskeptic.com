import React from 'react'
import NextLink from 'next/link'
import { Link } from '../routes'

export default ({ className, children, target, href, params, ...props }) => (
  <Link route={href}>
    <a className={className} target={target}>
      {children}
    </a>
  </Link>
)
