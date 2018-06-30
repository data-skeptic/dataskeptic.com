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
  getHasMore,
  getProps
} from '../helpers/list'
import { forEach, isEqual } from 'lodash'
import styled from 'styled-components'
import ListError from '../Components/ListError'

const decodePath = path => {
  const params = {}
  let attrs = path.split('?')

  if (attrs.length === 0 || attrs.length === 1) return params

  attrs = attrs[1].split('&').map(attr => attr.split('='))

  forEach(attrs, ([key, val]) => {
    params[key] = decodeURIComponent(val)
  })

  return params
}

export default function(options) {
  class WrappedList extends Component {
    static defaultProps = {
      initFromParams: () => {},
      loadMore: () => {},
      params: {}
    }

    state = {
      initialLimit: this.props.limit,
      initialOffset: this.props.offset
    }

    componentDidMount() {
      // We use old React-Router version
      // so we should parse params from location string manually
      const params = decodePath(this.props.location.search)

      if (this.props.autoLoad) {
        this.firstLoad({
          ...params
        })
      }
    }

    componentWillMount() {
      const params = decodePath(this.props.location.search)
      this.props.initFromParams(params)
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(nextProps.params, this.props.params)) {
        this.onParamsChanged(nextProps.params)
      }
    }

    onParamsChanged = nextParams => {
      const { limit, offset } = this.props

      this.loadMore(
        {
          limit: Number(limit),
          offset: Number(offset),
          ...nextParams
        },
        true
      )
    }

    loadMore = (params, reset = false) => {
      params = {
        ...this.props.params,
        ...params
      }

      if (this.props.hasMore) {
        if (reset) {
          params.limit = this.state.initialLimit
          params.offset = this.state.initialOffset
        }

        this.props.loadMore(params, reset)
      }
    }

    firstLoad = params => {
      const {
        limit = this.props.limit,
        offset = this.props.offset,
        ...rest
      } = params

      this.loadMore({
        limit: Number(limit),
        offset: Number(offset),
        ...rest,
        firstLoad: true
      })
    }

    renderDebug = () => {
      const {
        loading,
        loaded,
        error,
        offset,
        limit,
        hasMore,
        items,
        total,
        params,
        endMessage
      } = this.props

      return (
        <code>
          {JSON.stringify({
            loading,
            loaded,
            error,
            offset,
            limit,
            hasMore,
            total,
            params
          })}
        </code>
      )
    }

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
          {options.debug && this.renderDebug()}
          <InfiniteList
            {...rest}
            loadMore={this.loadMore}
            endMessage={endMessage}
          />
          {error && <ListError error={error} />}
          {options.debug && this.renderDebug()}
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
      hasMore: getHasMore(store),
      props: getProps(store)
    }
  })(WrappedList)
}

const Wrapper = styled.div``
