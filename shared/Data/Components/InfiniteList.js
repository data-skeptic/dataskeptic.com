import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ListLoader from './ListLoader'
import ListError from './ListError'
import ListEnd from './ListEnd'

export default class InfiniteList extends Component {
  static defaultProps = {
    loadMore: () => {},
    init: () => {},
    Item: () => {},
    items: [],
    limit: 10,
    offset: 0,
    endMessage: 'No more items.'
  }

  loadMore = (reset = false) => {
    const { loadMore, limit, offset } = this.props
    const nextOffset = +offset + +limit
    loadMore(limit, nextOffset, reset)
  }

  refresh() {
    console.dir(arguments)
    console.info('refresh')
  }

  render() {
    const { items, Item, hasMore, endMessage } = this.props
    const ItemComponent = Item

    return (
      <InfiniteScroll
        dataLength={items.length}
        refreshFunction={this.refresh}
        next={this.loadMore}
        hasMore={hasMore}
        loader={<ListLoader />}
        endMessage={<ListEnd message={endMessage} />}
      >
        {items.map(item => (
          <div key={item.blog_id}>
            <b>{endMessage}</b>
            <ItemComponent {...item} key={item.blog_id} />
          </div>
        ))}
      </InfiniteScroll>
    )
  }
}
