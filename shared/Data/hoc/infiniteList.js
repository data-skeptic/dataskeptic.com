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
import styled from 'styled-components'
import ListError from '../Components/ListError'

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
        total,
        endMessage
      } = this.props
      const { ...rest } = this.props

      return (
        <Wrapper>
          <code>
            {JSON.stringify({
              offset,
              limit
            })}
          </code>
          <InfiniteList {...rest} endMessage={endMessage} />
          <code>
            {JSON.stringify({
              offset,
              limit
            })}
          </code>
          {error && <ListError error={error} />}
        </Wrapper>
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

const Wrapper = styled.div``
