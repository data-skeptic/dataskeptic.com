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
        this.loadMore()
      }
    }

    loadMore() {}

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
          <InfiniteList {...rest} />
        </div>
      )
    }
  }

  return connect(state => ({
    loading: getItems(state[options.key]),
    loaded: getLoading(state[options.key]),
    error: getLoaded(state[options.key]),
    offset: getError(state[options.key]),
    limit: getLimit(state[options.key]),
    hasMore: getOffset(state[options.key]),
    items: getHasMore(state[options.key])
  }))(WrappedList)
}
