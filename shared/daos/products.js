import axios from "axios"

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../config/config.json')
var base_url = c[env]['base_api'] + env

export function getProducts(store, env) {
	console.log("Network: retrieving all products")
	var url = base_url + "/store/products/list"
	return axios
		.get(url)
  		.then(function(result) {
  			var products = result["data"]["Items"]
  			if (store) {
				store.dispatch({type: "ADD_PRODUCTS", payload: products})
  			}
			return products
		})
		.catch((err) => {
			console.log(err)
			if (store) {
				store.dispatch({type: "FETCH_PRODUCTS_ERROR", playload: err})
			}
			return []
		})
}
