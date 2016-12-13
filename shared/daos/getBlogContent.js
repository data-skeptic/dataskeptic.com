import axios from "axios"

import { extractFolders } from '../utils/blog_utils'

export default function getBlogContent(dispatch, pathname, env) {
	if (env == "prod") {
		env = ""
	} else {
		env = env + "."
	}
	var uri = "https://s3.amazonaws.com/" + env + 'dataskeptic.com/' + pathname
	console.log("getBlogContent: " + uri)
	axios
		.get(uri)
		.then(function(result) {
			var content = result["data"]
			dispatch({type: "ADD_BLOG_CONTENT", payload: {dispatch, content, uri} })
		})
		.catch(function (err) {
			console.log(err)
			dispatch({type: "FETCH_BLOGS_ERROR", playload: err})
		})
}
