import axios from "axios"

import { extractFolders } from '../utils/blog_utils'

export default function getBlogContent(dispatch, pathname, env) {
	if (env == "prod") {
		env = ""
	} else if (env == undefined) {
		env = ""
	} else {
		env = env + "."
	}
	if (pathname.substring(0, 1) == "/") {
		pathname = pathname.substring(1, pathname.length)
	}
	var uri = "https://s3.amazonaws.com/" + env + 'dataskeptic.com/' + pathname
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
