import React, { Component } from 'react'
import InfiniteList from '../Components/InfiniteList'
import { connect } from 'react-redux'
import {
  getItems,
  getLoading,
  getLoaded,
  getError,
  getLimit,
  getOffset,
  getHasMore
} from '../helpers/list'

export default function(options) {
  class WrappedList extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      if (options.autoLoad) {
        
        this.props.loadMore()
      }
    }

    render() {
      const {
        loading,
        loaded,
        error,
        offset,
        limit,
        hasMore,
        items
      } = this.props
      const { ...rest } = this.props
      return (
        <div>
          <code>
            {JSON.stringify({
              loading,
              loaded,
              error,
              offset,
              limit,
              hasMore,
              items
            })}
          </code>
          {/*<InfiniteList {...rest} />*/}
        </div>
      )
    }
  }

  return connect(state => {
    const store = options.dataSource(state)
    
    return {
      loading: getItems(store),
      loaded: getLoading(store),
      error: getLoaded(store),
      offset: getError(store),
      limit: getLimit(store),
      hasMore: getOffset(store),
      items: getHasMore(store)
    }
  })(WrappedList)
}
