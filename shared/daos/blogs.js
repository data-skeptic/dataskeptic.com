import axios from "axios"

export default function getBlogs(store, env) {
	var db_env = env
	if (db_env == "prod") {
		db_env = "master"
	}
	console.log("Network: retrieving all blog metadata")
	//var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + db_env
	var uri = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env + "/blog/all"
	console.log(uri)
	axios
		.get(uri)
		.then(function(result) {
			var blogs = result.data
			var blogs_loaded = true
    		console.log("++++++++++++++++++ ADD BLOGS -======================")			
			store.dispatch({type: "ADD_BLOGS", payload: blogs })
			store.dispatch({type: "SET_BLOGS_LOADED", payload: 1 })
		})
		.catch((err) => {
			console.log(err)
			store.dispatch({type: "FETCH_BLOGS_ERROR", playload: err})
		})			
}