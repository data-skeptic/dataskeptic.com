import React, { Component } from 'react'
import { Async } from 'react-select'
import axios from 'axios'
import styled from 'styled-components'
import Highlighter from 'react-highlight-words'

export default class ContributorSelect extends Component {
  state = {
    firstInit: false,
    query: '',
    selectedOption: this.props.input.value
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })

    const blog_id = selectedOption ? selectedOption.blog_id : null

    const { input: { onChange } } = this.props
    onChange(blog_id)
  }

  inputChange = query => this.setState({ query })

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      if (this.state.firstInit) return

      this.setState({
        firstInit: true
      })

      this.handleChange(nextProps.input.value)
    }
  }

  getOptions = query => {
    query = encodeURIComponent(query)

    return axios
      .get(`/api/v1/contributors/list?q=${query}`)
      .then(res => res.data)
      .then(data => {
        const items = Object.keys(data).map(id => {
          const contributor = data[id]
          return {
            ...contributor,
            id
          }
        })
        debugger

        return items
      })
      .then((options = []) => ({ options }))
  }

  renderOption = option => {
    const { title, abstract } = option
    const { query } = this.state
    return (
      <Item>
        <Title>
          <Highlighter
            highlightClassName="matching"
            searchWords={[query]}
            textToHighlight={title}
          />
        </Title>
        <Abstract>
          <Highlighter
            highlightClassName="matching"
            searchWords={[query]}
            textToHighlight={abstract}
          />
        </Abstract>
      </Item>
    )
  }

  renderValue = ({ title }) => {
    return (
      <Item>
        <Title>{title}</Title>
      </Item>
    )
  }

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
        valueRenderer={this.renderValue}
      />
    )
  }
}

const Item = styled.div``

const Title = styled.p`
  font-weight: bold;
`

const Abstract = styled.p``
