import React, { Component } from 'react'
import styled from 'styled-components'

export default class UsersSearch extends Component {
  state = {
    value: null,
    error: null
  }

  defaultProps = {
    onChange: () => {}
  }

  setValue = value => this.setState({ value })
  setError = error => this.setState({ error })

  validate = val => {
    const valid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    if (!valid) {
      this.setError('Invalid email format')
    }
    return valid
  }

  change = e => {
    const value = e.target.value
    this.setValue(value)

    if (this.validate(value)) {
      this.props.onChange(value)
    }
  }

  render() {
    const { error } = this.state

    return (
      <Wrapper>
        <Input onChange={this.change} error={error} />
        {error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``
const Input = styled.input``
const Error = styled.div`
  color: red;
`
