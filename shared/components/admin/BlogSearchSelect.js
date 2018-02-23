import React, { Component } from "react"
import { Async } from "react-select"
import axios  from "axios"
import styled from "styled-components"
import Highlighter from "react-highlight-words"

export default class BlogSearchSelect extends Component {
  state = {
	  firstInit: false,
	  query: "",
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

  inputChange = query => this.setState({ query })

  handleChange = selectedOption => {
    this.setState({ selectedOption })
    const { blog_id } = selectedOption
    const { id, onChange = () => {} } = this.props

    onChange(id, blog_id)
  }

  getOptions = query => {
    if (!query) {
      return Promise.resolve([])
    }

    query = encodeURIComponent(query)

    return axios
      .get(`/api/search?q=${query}`)
      .then(res => res.data)
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
        autoload={false}
        value={selectedOption}
        valueKey="blog_id"
        labelKey="title"
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
