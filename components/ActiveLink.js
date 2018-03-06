import React from 'react'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const ActiveLink = ({ children, router, href }) => {
  const isActive = (path, href) => path.indexOf(href) === 0
  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <NavLink
      href={href}
      onClick={handleClick}
      active={isActive(router.pathname, href)}
    >
      {children}
    </NavLink>
  )
}

export default withRouter(ActiveLink)

const NavLink = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: ${props =>
    props.active
      ? props => props.theme.colors.primary
      : props.theme.colors.link};
  padding: 30px 0px;
  border-bottom: 2px solid
    ${props =>
      props.active ? props => props.theme.colors.primary : 'transparent'};
  box-sizing: content-box;
  margin-right: 40px;

  &:hover {
    color: #f0e8b4;
    border-bottom-color: #f0e8b4;
  }
`
