import React, { Component } from 'react'
import { Async } from 'react-select'
import axios from 'axios'
import styled from 'styled-components'

export default class DiscountingField extends Component {
  static state = {
    validationValue: this.props.input.value
  }

  validate = code =>
    axios
      .get(`/api/v1/careers/verify_discount`)
      .then(res => res.data)
      .then((options = []) => ({ options }))

  handleChange = e => this.setState({ value: e.target.value })

  render() {
    const { value } = this.props
    const { validationValue } = this.state

    return (
      <div>
        <code>
          {JSON.stringify({
            value,
            validationValue
          })}
        </code>
        <Input onChange={this.handleChange} />
      </div>
    )
  }
}

const Input = styled.input``
