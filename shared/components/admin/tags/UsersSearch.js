import React, { Component } from 'react'
import styled from 'styled-components'
import ClearableInput from '../../../Forms/Common/ClearableInput'

export default class UsersSearch extends Component {
  state = {
    error: null
  }

  defaultProps = {
    onChange: () => {}
  }

  setError = error => this.setState({ error })

  validate = val => {
    const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

    if (!valid) {
      this.setError('Invalid email format')
    } else {
      this.setError(null)
    }

    return valid
  }

  onChange = value => {
    if (this.validate(value)) {
      this.props.onChange(value)
    }
  }

  render() {
    const { error } = this.state

    return (
      <Wrapper>
        <ClearableInput
          onChange={this.onChange}
          immediate={true}
          error={error}
        />
        {error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

const Error = styled.div`
  color: indianred;
`
