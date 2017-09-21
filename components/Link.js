import React from 'react'
import NextLink from 'next/link'

export default ({ className, children, target, ...props }) => (
    <NextLink {...props}>
        <a className={className} target={target}>
            {children}
        </a>
    </NextLink>
)
