import axios from "axios"

export default function getProducts(store, env) {
	console.log("Network: retrieving all products")
	var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/products"
	console.log(uri)
	axios
		.get(uri)
		.then(function(result) {
			var products = result.data.Items
			if (products != undefined) {
				store.dispatch({type: "ADD_PRODUCTS", payload: products })
				console.log("Loaded products")
			}
		})
		.catch((err) => {
			store.dispatch({type: "FETCH_PRODUCTS_ERROR", playload: err})
		})			
}
