import React, { Component } from 'react'
import axios from 'axios'
import { Async } from 'react-select'

const getUserTags = email => axios.get(`/api/v1/admin/tags?email=${email}`)

export default class TagsSelect extends Component {
  state = {
    selectedOption: {
      test: '1'
    }
  }

  getTags = search => {
    if (!search) {
      return Promise.resolve({ options: [] })
    }

    return getUserTags(search)
      .then(response => response.json())
      .then(json => {
        return { options: json.items }
      })
  }

  render() {
    const { selectedOption } = this.state

    return (
      <div>
        <code>{JSON.stringify(selectedOption)}</code>
        <Async
          multi={false}
          value={selectedOption}
          loadOptions={this.getTags}
        />
      </div>
    )
  }
}
