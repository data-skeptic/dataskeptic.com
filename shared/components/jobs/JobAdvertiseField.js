import React, { Component } from 'react'
import { Async } from 'react-select'
import axios from 'axios'
import styled from 'styled-components'

const Dollar = () => <Sign>$</Sign>

const formatPrice = price => (
  <Price>
    <Dollar />
    {(price).toFixed(2)}
  </Price>
)

export default class JobAdvertiseField extends Component {
  state = {
    firstInit: false,
    selectedOption: this.props.value
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (this.state.firstInit) return

      this.setState({
        selectedOption: nextProps.value,
        firstInit: true
      })
    }
  }

  getOptions = () =>
    axios
      .get(`/api/v1/jobs/ads`)
      .then(res => res.data)
      .then((options = []) => ({ options }))

  renderOption = ({ desc, price }) => {
    return (
      <Item>
        <Title>
          {formatPrice(price)}
          {' – '}
          {desc}
        </Title>
      </Item>
    )
  }

  renderValue = ({ desc, price }) => {
    return (
      <Item>
        <Title>
          {formatPrice(price)}
          {' – '}
          {desc}
        </Title>
      </Item>
    )
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    const { handleChange = () => {} } = this.props
    handleChange(selectedOption)
  }

  render() {
    const { selectedOption } = this.state

    return (
      <Async
        name="form-field-name"
        value={selectedOption}
        autoload={true}
        searchable={false}
        valueKey="sku"
        labelKey="title"
        onChange={this.handleChange}
        loadOptions={this.getOptions}
        optionRenderer={this.renderOption}
        valueRenderer={this.renderValue}
      />
    )
  }
}

const Item = styled.div``

const Title = styled.p`
  font-weight: bold;
`

const Price = styled.span`
  font-weight: bold;
`

const Sign = styled.span`
  font-size: 80%;
`

const Desc = styled.p``
