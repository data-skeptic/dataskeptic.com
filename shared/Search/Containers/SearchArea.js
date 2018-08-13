import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleSearchArea } from '../../Layout/Actions/LayoutActions'
import SearchField from '../Components/SearchField'
import redirectToSearch from '../Helpers/redirectToSearch'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import searchReducers from '../../reducers/SearchReducer'

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  searchReducers,
  applyMiddleware(middleware)
)

class SearchArea extends Component {
  toggleArea = () => this.props.dispatch(toggleSearchArea())

  handleSearchChange = query => {
    // redirectToSearch(query)
    const { dispatch } = this.props

    dispatch({
      type: 'SEARCH',
      payload: {
        query,
        dispatch
      }
    })
    store.dispatch(push(`/search?q=${query}`))
    const title = `Search - ${query}`
    document.title = title;
    this.toggleArea()
  }

  render() {
    const { searchAreaVisible, isLoading, query } = this.props

    return (
      <div className="navlink-li-btn-container">
        {searchAreaVisible && (
          <div className="search-field-container">
            <SearchField
              autoFocus={true}
              onChange={this.handleSearchChange}
              loading={isLoading}
              value={query}
            />
          </div>
        )}
        <button className="navlink-btn" onClick={this.toggleArea}>
          <div className="search-btn-wrap">
            <div className="search-btn-container">&nbsp;</div>
          </div>
        </button>
      </div>
    )
  }
}

export default connect(state => ({
  searchAreaVisible: state.layout.getIn(['searchAreaVisible']),
  isLoading: state.search.getIn(['loading']),
  query: state.search.getIn(['query'])
}))(SearchArea)
