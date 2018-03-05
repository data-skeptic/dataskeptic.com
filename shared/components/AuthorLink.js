import React, { Component } from 'react'
import { Link } from 'react-router'
import isCtrlOrCommandKey from '../utils/isCtrlOrCommandKey'

const formatLink = (author = '') => `/contributors/${author.toLowerCase()}`

const goTop = e => {
  if (window) {
    if (!isCtrlOrCommandKey(e)) {
      window.scrollTo(0, 0)
    }
  }
}

export default ({ author, children }) => (
  <Link to={formatLink(author)} onClick={goTop}>
    {children}
  </Link>
)
