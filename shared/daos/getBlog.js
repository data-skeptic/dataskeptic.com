import axios from "axios"

import { extractFolders } from '../utils/blog_utils'

export default function getBlog(dispatch, env, prettyname) {
	var db_env = env
	if (db_env == "prod") {
		db_env = "master"
	}
	var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blog?env=" + db_env + "&pn=" + prettyname
	// TODO: check cache
	axios
		.get(uri)
		.then(function(result) {
			var blog = result.data
			var loaded = true
			var pl = {blog, loaded}
			dispatch({type: "ADD_BLOG", payload: pl })
		})
		.catch((err) => {
			dispatch({type: "FETCH_BLOGS_ERROR", playload: err})
		})
}

