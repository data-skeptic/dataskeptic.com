import React, { Component } from 'react'
import axios from 'axios'
import { AsyncCreatable } from 'react-select'

const getUserTags = tag =>
  axios.get(`/api/v1/admin/tags?tag=${tag}`).then(res => res.data)

const addTag = tag =>
  axios.post(`/api/v1/admin/tags`, tag).then(res => res.data)

export default class TagsSelect extends Component {
  state = {
    selectedOptions: this.props.value || []
  }
  getTags = search => {
    if (!search) {
      return Promise.resolve({ options: [] })
    }

    return getUserTags(search).then(options => ({ options }))
  }
  createOption = data => {
    addTag(data).then(result => {
      if (result.error) {
        console.error(result.error)
      } else {
        const option = {
          ...data,
          tag_id: result.tag_id
        }

        this.setState(prevState => ({
          selectedOptions: [...prevState.selectedOptions, option]
        }))
      }
    })
  }
  update = selectedOptions => this.setState({ selectedOptions })

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        selectedOptions: nextProps.value
      })
    }
  }

  render() {
    const { selectedOptions } = this.state

    return (
      <AsyncCreatable
        multi={true}
        value={selectedOptions}
        onNewOptionClick={this.createOption}
        loadOptions={this.getTags}
        onChange={this.update}
        labelKey={'tag_name'}
        valueKey={'tag_id'}
      />
    )
  }
}
