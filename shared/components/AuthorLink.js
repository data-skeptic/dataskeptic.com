import React, { Component } from 'react'
import { Link } from 'react-router'

const formatLink = (author='') => `/contributors/${author.toLowerCase()}`

export default ({ author, children }) => (
    <Link to={formatLink(author)}>
        {children}
    </Link>
)
