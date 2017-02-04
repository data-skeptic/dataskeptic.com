import axios from "axios"

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
	  			console.log(folders)
				dispatch({type: "ADD_FOLDERS", payload: folders})
			})
			.catch((err) => {
				console.log(err)
			})			
	}
}

export function get_blogs_list(dispatch, pathname) {
	var prefix = "/blog"
	var bpathname = pathname.substring(prefix.length, pathname.length)
	var my_cache = global.my_cache
	if (my_cache != undefined) {
		var blogmetadata_map = my_cache.blogmetadata_map
		var keys = Object.keys(blogmetadata_map)
		var blogs = []
		var limit = 30
		for (var i=0; i < keys.length & blogs.length < limit; i++) {
			var key = keys[i]
			var blog = blogmetadata_map[key]
			var pn = blog.prettyname
			if (pn.indexOf(bpathname) == 0) {
				blogs.push(blog)
			}
		}
		dispatch({type: "ADD_BLOGS", payload: blogs})
	} else {
		console.log("Getting blogs")
		axios
			.get("/api/" + pathname)
	  		.then(function(result) {
	  			var blogs = result["data"]
				dispatch({type: "ADD_BLOGS", payload: blogs})
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
	  			var folders = result["data"]
				dispatch({type: "ADD_FOLDERS", payload: folders})
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
	console.log("get em:"+pathname)
	var year = year_from_path(pathname)
	console.log(year)
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