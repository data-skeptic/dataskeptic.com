import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchField from '../Components/SearchField'
import redirectToSearch from '../Helpers/redirectToSearch'

class MobileSearchArea extends Component {
  handleSearchChange = query => redirectToSearch(query)

  render() {
    const { isLoading, query } = this.props

    return (
      <div className="mobile-search-field-container">
        <SearchField
          autoFocus={true}
          onChange={this.handleSearchChange}
          loading={isLoading}
          value={query}
        />
      </div>
    )
  }
}

export default connect(state => ({
  isLoading: state.layout.getIn(['loading']),
  query: state.search.getIn(['query'])
}))(MobileSearchArea)
