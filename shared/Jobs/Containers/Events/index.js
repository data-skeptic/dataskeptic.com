import React, { Component } from 'react'
import styled from 'styled-components'

import Event from '../../Components/Event'

export default class Events extends Component {
  static defaultProps = {
    events: []
  }

  renderEvent = (event, index) => <Event {...event} key={index} />

  isEmpty = () => this.props.events.length === 0

  renderEmpty = () => <Empty>No events.</Empty>

  render() {
    const { events } = this.props
    return (
      <Wrapper>
        {this.isEmpty() ? this.renderEmpty() : events.map(this.renderEvent)}
      </Wrapper>
    )
  }
}

export const Wrapper = styled.div``

export const Empty = styled.div`
  color: #575959;
`
