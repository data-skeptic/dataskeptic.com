import axios from "axios"

import { extractFolders } from '../utils/blog_utils'

export default function getBlogContent(dispatch, blog, env) {
	if (env == "prod" || env == "master") {
		env = ""
	} else if (env == undefined) {
		env = ""
	} else {
		env = env + "."
	}
	var renderedPath = blog['rendered']
	var uri = "https://s3.amazonaws.com/" + env + 'dataskeptic.com/' + renderedPath
	axios
		.get(uri)
		.then(function(result) {
			var content = result["data"]
			dispatch({type: "ADD_BLOG_CONTENT", payload: {content, blog} })
		})
		.catch(function (err) {
			console.log(err)
			console.log(uri)
			dispatch({type: "FETCH_BLOGS_ERROR", playload: err})
		})
}
