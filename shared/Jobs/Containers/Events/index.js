import React, { Component } from 'react'
import styled from 'styled-components'

import Event from '../../Components/Event'

export default class Events extends Component {
  static defaultProps = {
    events: []
  }

  renderEvent = (event, index) => <Event {...event} key={index} />

  render() {
    const { events } = this.props
    return <Wrapper>{events.map(this.renderEvent)}</Wrapper>
  }
}

export const Wrapper = styled.div``
