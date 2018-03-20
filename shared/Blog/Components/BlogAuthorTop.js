import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const formatLink = id => `/contributors/${id}`

export const BlogAuthorTop = ({ author, prettyname, img, isFirst, isLast }) => (
  <Wrapper to={formatLink(author)} isFirst={isFirst} isLast={isLast}>
    <Avatar src={img} />
    <Name>{prettyname}</Name>
  </Wrapper>
)

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;

  &:after {
    ${props =>
      !props.isLast &&
      `
      content: ",";
    `};
  }

  &:hover {
    border: none;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 38px;
  height: 38px;
  padding: 2px;
  background-color: #ffffff;
  border: 1px solid #dddddd !important;
  margin-right: 0.3em;
  margin-left: 0.3em;
`

const Name = styled.span``

export default BlogAuthorTop
