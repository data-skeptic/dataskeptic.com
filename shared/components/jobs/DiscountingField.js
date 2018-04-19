import React, { Component } from 'react'
import { Async } from 'react-select'
import axios from 'axios'
import styled from 'styled-components'

export default class DiscountingField extends Component {
  state = {
    value: '',
    valid: false
  }

  validate = code =>
    axios
      .post(`/api/v1/careers/verify_discount`, { code })
      .then(res => res.data)

  handleChange = e => this.setState({ value: e.target.value })

  render() {
    const { value, valid } = this.state
    const { className } = this.props

    return (
      <Input onBlur={this.handleChange} className={className} valid={true} />
    )
  }
}

const Input = styled.input`
  position: relative;

  ${props =>
    props.valid &&
    `
    
    border-color: green;
  `};
`
