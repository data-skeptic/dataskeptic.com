import axios from "axios"

function extractFolders(blogs) {
	var folders = []
	if (blogs != undefined) {
		for (var i in blogs) {
			var b = blogs[i]
			var pn = b["prettyname"]
			if (pn != undefined) {
				var arr = pn.split("/")
				var level = 0
				if (arr.length >= level+2) {
					var folder = arr[level+1]
					folders.push(folder)
				}
			}
		}
		folders = folders.reduce((a, x) => a.includes(x) ? a : [...a, x], []).sort()
	}
	return folders
}


export default function getBlogs(store, env) {
	axios
		.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/blog?env=" + env)
		.then(function(result) {
			var blogs = result.data
			var blogs_loaded = true
			var folders = extractFolders(blogs)
			store.dispatch({type: "ADD_BLOGS", payload: blogs })
			store.dispatch({type: "SET_BLOGS_LOADED", payload: 1 })
			store.dispatch({type: "SET_FOLDERS", payload: folders })
			console.log("Loaded blogs")
		})
		.catch((err) => {
			store.dispatch({type: "FETCH_BLOGS_ERROR", playload: err})
		})			
}