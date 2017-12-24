import axios from "axios"
import {get_contributors} from 'backend/get_contributors'
import contact_form_send from '../daos/contact_form_send'

export function clearEpisode(dispatch) {
	dispatch({type: "CLEAR_FOCUS_EPISODE"})
}

export function loadEpisode(guid, dispatch) {
    dispatch({type: "CLEAR_FOCUS_EPISODE"})

	axios
		.get("/api/episodes/get/" + guid)
  		.then(function(result) {
  			var episode = result["data"]

            dispatch({type: "SET_FOCUS_EPISODE", payload: episode})
		})
		.catch((err) => {
			console.log(err)
		})
}

export function pay_invoice(prod, dispatch, event, id, amount) {
	dispatch({type: "START_INVOICE_PAYMENT", payload: {}})
	if (prod) {
    	var key = 'pk_live_JcvvQ05E9jgvtPjONUQdCqYg'
	} else {
		var key = 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo'
	}

	Stripe.setPublishableKey(key)

	Stripe.createToken(event.target, function(status, response) {
		var token = response.id
		var paymentError = ""
		if (response.error) {
			paymentError = response.error.message
			var pubError = "Error: " + paymentError
			console.log(pubError)
			dispatch({type: "INVOICE_ERROR", payload: {paymentError: pubError}})
			var msg = {err: paymentError, invoice: "yes"}
			var email = "invoice"
			contact_form_send("dataskeptic.com", email, msg, undefined)

		} else {
			var uri = "/api/invoice/pay?id=" + id + "&token=" + token + "&amount=" + amount
			axios
				.get(uri)
				.then(function(resp) {
					var r = resp['data']
					dispatch({type: "INVOICE_RESULT", payload: r })
				})
				.catch(function(err) {
					console.log(err)
					var r = err["data"]
					dispatch({type: "INVOICE_RESULT", payload: r })
				})
		}
	})
}

export function get_invoice(dispatch, id) {
    var uri = "/api/invoice?id=" + id
    axios
        .get(uri)
        .then(function(resp) {
          var invoice = resp['data']
          console.log("invoice")
          console.log(invoice)
          console.log(uri)
          dispatch({type: "ADD_INVOICE", payload: invoice })
        })
        .catch(function(err) {
          console.log(err)
        })
}

export function get_related_content(dispatch, pathname) {
    const uri = "/api/Related?uri=" + pathname;

    return axios.get(uri)
        .then(function(resp) {
          const data = resp['data'];
          const items = data;
          dispatch({type: "ADD_RELATED", payload: {items, uri: pathname} })
        })
        .catch(function(err) {
          console.log(err)
        })
}


export function get_folders(dispatch) {
	var my_cache = global.my_cache
	if (my_cache != undefined) {
		var folders = my_cache.folders
		dispatch({type: "ADD_FOLDERS", payload: folders})
	} else {
		console.log("Getting blog categories")
		axios
			.get("/api/blog/categories")
	  		.then(function(result) {
	  			var folders = result["data"]
				dispatch({type: "ADD_FOLDERS", payload: folders})
			})
			.catch((err) => {
				console.log(err)
			})			
	}
}

export function get_homepage_content(dispatch) {
	var my_cache = global.my_cache
	if (my_cache != undefined) {
		var episode = my_cache.episodes_map["latest"]
		var contributors = get_contributors()
		var loaded = 1
		dispatch({type: "SET_FOCUS_EPISODE", payload: episode})
	} else {
		console.log("Loading homepage content")
		axios
			.get("/api/v1/episodes/list?limit=1")
	  		.then(function(result) {
	  			var episode = result.data.episodes[0]
				dispatch({type: "SET_FOCUS_EPISODE", payload: episode})
			})
			.catch((err) => {
				console.log(err)
			})
	}	
}

export function get_products(dispatch) {
	var my_cache = global.my_cache
	if (my_cache != undefined) {
		var products = my_cache.products
		dispatch({type: "ADD_PRODUCTS", payload: products})
	} else {
		console.log("Getting products")
		axios
			.get("/api/store/list")
	  		.then(function(result) {
	  			var products = result["data"]["items"]
				dispatch({type: "ADD_PRODUCTS", payload: products})
			})
			.catch((err) => {
				console.log(err)
			})			
	}
}

export function year_from_path(pathname) {
	var l = '/podcast/'.length
	var year = -1
	if (pathname.length > l) {
		year = pathname.substring(l, pathname.length)
	}
	return year
}

export function get_podcasts_from_cache(my_cache, pathname) {
	var year = year_from_path(pathname)
	var episodes_list = my_cache.episodes_list
	var episodes_map = my_cache.episodes_map
	var episodes = []
	for (var i=0; i < episodes_list.length; i++) {
		var guid = episodes_list[i]
		var episode = episodes_map[guid]
        var pd = new Date(episode.pubDate)
        var eyear = pd.getYear()+1900
        if (year == -1) {
        	year = eyear
        }
        if (year == eyear) {
        	episodes.push(episode)
        }
	}
	return episodes
}

export function get_podcasts(dispatch, pathname) {
	var year = year_from_path(pathname)
	var my_cache = global.my_cache
	if (my_cache != undefined) {
		var episodes = get_podcasts_from_cache(my_cache, pathname)
		dispatch({type: "ADD_EPISODES", payload: episodes})
	} else {
		console.log("Getting episodes")
		axios
			.get("/api/episodes/list?year=" + year)
	  		.then(function(result) {
	  			var episodes = result["data"]
				dispatch({type: "ADD_EPISODES", payload: episodes})
			})
			.catch((err) => {
				console.log(err)
			})			
	}
}