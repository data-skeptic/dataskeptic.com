import axios from "axios"

import { extractFolders } from '../utils/blog_utils'

export default function getBlogs(store, env) {
	var db_env = env
	if (db_env == "prod") {
		db_env = "master"
	}
	axios
		.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + db_env)
		.then(function(result) {
			var blogs = result.data
			var blogs_loaded = true
			var folders = extractFolders(blogs)
			store.dispatch({type: "ADD_BLOGS", payload: blogs })
			store.dispatch({type: "SET_BLOGS_LOADED", payload: 1 })
			store.dispatch({type: "SET_FOLDERS", payload: folders })
		})
		.catch((err) => {
			store.dispatch({type: "FETCH_BLOGS_ERROR", playload: err})
		})			
}