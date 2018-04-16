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
    static defaultProps = {
      loadMore: () => {}
    }

    constructor(props) {
      super(props)
    }

    componentDidMount() {
      if (this.props.autoLoad) {
        this.firstLoad()
      }
    }

    loadMore = (limit, offset) => {
      if (this.props.hasMore) {
        this.props.loadMore(limit, offset)
      }
    }

    firstLoad = () => this.loadMore(this.props.limit, this.props.offset)

    render() {
      const {
        loading,
        loaded,
        error,
        offset,
        limit,
        hasMore,
        items,
        total
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
              total
            })}
          </code>
          <InfiniteList {...rest} />
        </div>
      )
    }
  }

  return connect(state => {
    const store = options.dataSource(state)

    return {
      items: getItems(store),
      loading: getLoading(store),
      loaded: getLoaded(store),
      error: getError(store),
      limit: getLimit(store),
      offset: getOffset(store),
      hasMore: getHasMore(store)
    }
  })(WrappedList)
}
