import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ListLoader from './ListLoader'
import ListError from './ListError'

export default class InfiniteList extends Component {
  static defaultProps = {
    loadMore: () => {},
    Item: () => {},
    items: [],
    limit: 10,
    offset: 0
  }

  loadMore = () => {
    const { loadMore, limit, offset } = this.props
    const nextOffset = offset + limit
    loadMore(limit, nextOffset)
  }

  refresh() {
    console.dir(arguments)
    console.info('refresh')
  }

  render() {
    const { items, Item, hasMore } = this.props
    const ItemComponent = Item

    return (
      <InfiniteScroll
        dataLength={items.length}
        refreshFunction={this.refresh}
        next={this.loadMore}
        hasMore={hasMore}
        loader={<ListError />}
        endMessage={<ListError />}
      >
        {items.map((item, index) => <ItemComponent {...item} key={index} />)}
      </InfiniteScroll>
    )
  }
}
