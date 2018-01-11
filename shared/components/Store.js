import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Loading from '../Common/Components/Loading'
import CartContainer from '../Cart/Containers/CartContainer'
import StoreItem from './StoreItem'

import {get_products} from '../utils/redux_loader'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class Store extends React.Component {

	componentWillMount() {
		var oproducts = this.props.products.toJS()
		if (oproducts.products.length == 0) {
			get_products(this.props.dispatch)			
		}

        const {dispatch} = this.props;
        const {title} = Store.getPageMeta();

        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: `Store | Data Skeptic`
        }
    }

    render() {
		var oproducts = this.props.products.toJS()
		var products_loaded = oproducts.products_loaded
		if (products_loaded == undefined) {
			products_loaded = 0
		}
		if (products_loaded == 0) {
			return <div><Loading /></div>			
		} else {
			var products = oproducts.products
			return (
				<div className="center">
					<div className="store-items">
						{products.map(function(product) {
							return <StoreItem key={product.id} product={product} />
						})}
					</div>
					<CartContainer needCheckout={true} updatable={true} />
				</div>
			)
		}
	}
}

export default connect(state => ({ products: state.products, cart: state.cart }))(Store)

