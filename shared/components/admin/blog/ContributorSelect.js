import React, { Component } from 'react'
import { Async } from 'react-select'
import axios from 'axios'
import styled from 'styled-components'
import { find, orderBy } from 'lodash'

const normalizeKey = key => key.toLowerCase() 

export default class ContributorSelect extends Component {
  state = {
    firstInit: false,
    query: '',
    selectedOption: normalizeKey(this.props.input.value)
  }

  handleChange = option => {
    const selectedOption = normalizeKey(option.id)
    this.setState({ selectedOption })

    const { input: { onChange } } = this.props
    onChange(selectedOption)
  }

  inputChange = query => this.setState({ query })

  getOptions = query => {
    query = encodeURIComponent(query)

    return axios
      .get(`/api/v1/contributors?q=${query}`)
      .then(res => res.data)
      .then((options = []) => ({ options }))
  }

  renderOption = ({ prettyname, img }) => (
    <Item>
      <Avatar src={img} alt={prettyname} />
      <Title>{prettyname}</Title>
    </Item>
  )

  render() {
    const { selectedOption } = this.state

    return (
      <Async
        name="form-field-name"
        autoload={true}
        value={selectedOption}
        valueKey="id"
        labelKey="prettyname"
        onInputChange={this.inputChange}
        onChange={this.handleChange}
        loadOptions={this.getOptions}
        optionRenderer={this.renderOption}
        valueRenderer={this.renderOption}
      />
    )
  }
}

const Item = styled.div`
  display: flex;
  flex-direction: wrap;
  align-items: center;
`

const Title = styled.p`
  font-weight: bold;
  margin: 0px;
  padding: 0px;
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 2px;
  background-color: #ffffff;
  border: 1px solid #dddddd !important;
  margin-right: 0.3em;
  overflow: hidden;
  margin-top: 2px;
`
