import axios from 'axios'

var base_url = process.env.BASE_API || 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/prod'

export function getProducts(store, env) {
  console.log('Network: retrieving all products')
  var url = base_url + '/store/products/list'
  return axios
    .get(url)
    .then(function(result) {
      var products = result['data']['Items']
      if (store) {
        store.dispatch({ type: 'ADD_PRODUCTS', payload: products })
      }
      return products
    })
    .catch(err => {
      console.log(err)
      if (store) {
        store.dispatch({ type: 'FETCH_PRODUCTS_ERROR', playload: err })
      }
      return []
    })
}
