import React, { Component } from 'react'
import styled from 'styled-components'
import Message from '../Message/index'

export default class Menu extends Component {
  renderItem = ({ label, handler, isFirst, isLast }) => (
    <Item
      key={handler}
      isFirst={isFirst}
      isLast={isLast}
      onClick={() => this.choose(label)}
    >
      {label}
    </Item>
  )

  renderState() {
    const { list = 0 } = this.props
    return (
      <List>
        {list.map((label, index) => {
          const isFirst = index === 0
          const isLast = index === list.length - 1

          return this.renderItem({
            ...label,
            isLast,
            isFirst
          })
        })}
      </List>
    )
  }

  choose(label) {
    alert(label)
  }

  render() {
    const { ...rest } = this.props
    const sent = false

    return (
      <Message {...rest} sent={sent}>
        {this.renderState()}
      </Message>
    )
  }
}

const List = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  min-width: 200px;
  overflow: hidden;
`

const Item = styled.button`
  padding: 12px 8px;
  color: #5736e1;
  border: none;

  ${props =>
    !props.isLast && `
    border-bottom: 1px solid #e6e6e6;
  `};
`
