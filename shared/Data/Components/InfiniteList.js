import React, { Component } from 'react'

export default class InfiniteList extends Component {
  static defaultProps = {
    onLoad: () => {},
    Item: () => {},
    items: []
  }

  render() {
    const { items, Item } = this.props
    const ItemComponent = Item

    return (
      <section>
        {items.map((item, index) => <ItemComponent {...item} key={index} />)}
      </section>
    )
  }
}
