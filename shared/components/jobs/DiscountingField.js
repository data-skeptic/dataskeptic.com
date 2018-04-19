import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

export default class DiscountingField extends Component {
  static defaultProps = {
    onDiscount: () => {}
  }

  state = {
    value: '',
    valid: false
  }

  componentDidMount() {
    const value = this.props.input.value

    if (!isEmpty(value)) {
      this.setState({ value })
      this.validate(value)
    }
  }

  validate = code =>
    axios
      .post(`/api/v1/careers/verify_discount`, { code })
      .then(res => res.data)
      .then(({ valid, discount_amount }) => {
        this.setState({
          valid
        })

        this.props.onDiscount({
          valid,
          discount_amount
        })
      })

  handleChange = e => {
    const value = e.target.value
    this.setState({ value })
  }

  handleBlur = e => {
    const value = e.target.value
    const { input: { onChange } } = this.props
    
    this.validate(value)
    onChange(value)
  }

  render() {
    const { value, valid } = this.state
    const { className } = this.props

    return (
      <Input
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        className={className}
        valid={valid}
        value={value}
      />
    )
  }
}

const Input = styled.input`
  ${props =>
    props.valid &&
    `
    
    border-color: green !important;
  `};
`
