import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Loading from '../Common/Components/Loading'
import CartContainer from '../Cart/Containers/CartContainer'
import StoreItem from './StoreItem'

import { get_products } from '../utils/redux_loader'

import { changePageTitle } from '../Layout/Actions/LayoutActions'

class Store extends React.Component {
  static getPageMeta() {
    return {
      title: 'Store | Data Skeptic'
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const loaded = this.props.products.get('products_loaded')
    if (!loaded) {
      get_products(dispatch)
    }
    const { title } = Store.getPageMeta()
    dispatch(changePageTitle(title))
  }

  render() {
    var oproducts = this.props.products.toJS()
    var products_loaded = oproducts.products_loaded
    if (products_loaded == undefined) {
      products_loaded = 0
    }

    if (products_loaded === 0) {
      return (
        <div>
          <Loading />
        </div>
      )
    } else {
      var products = oproducts.products || []
      return (
        <div className="">
          <div className="col-md-8 col-sm-12 store-items">
            <center>
              For questions about sizes, review our about{' '}
              <a href="https://dataskeptic.com/blog/meta/2018/data-skeptic-t-shirt-sizing">
                t-shirt sizing measurements
              </a>.
            </center>
            {products.map(function(product, index) {
              return <StoreItem key={index} uniq={index} product={product} />
            })}
          </div>
          <div className="col-md-4 col-sm-12">
            <CartContainer needCheckout={true} updatable={true} />
          </div>
        </div>
      )
    }
  }
}

export default connect(state => ({
  products: state.products,
  cart: state.cart
}))(Store)
