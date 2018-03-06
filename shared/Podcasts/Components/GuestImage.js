import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class GuestImage extends Component {
  render() {
    const { dest, title, index } = this.props

    return (
      <Wrapper index={index}>
        <Avatar src={dest} alt={title} />
        <Tooltip>{title}</Tooltip>
      </Wrapper>
    )
  }
}

const Tooltip = styled.div`
  visibility: hidden;
  background-color: #565858;
  color: #fff;
  text-align: center;
  border-radius: 6px;

  left: 50%;
  top: -6px;
  width: auto;
  padding: 4px 4px;
  transform: translateX(-50%) translateY(-100%);
  min-width: 140px;

  position: absolute;
  z-index: 100;

  ::after {
    content: ' ';
    position: absolute;
    top: 98%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #565858 transparent transparent transparent;
  }
`

const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  display: inline-block;
  margin-left: -15px;
  margin-top: -15px;
  border: 4px solid;
  border-radius: 50%;
  z-index: ${props => props.index};

  :hover {
    > ${Tooltip} {
      visibility: visible;
    }
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

export default connect(state => ({
  contributors: state.site.get('contributors').toJS()
}))(GuestImage)
