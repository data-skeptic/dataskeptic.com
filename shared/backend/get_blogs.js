module.exports = {
  get_blogs: function(req, res, blogmetadata_map, exclude=['/episodes', '/transcripts']) {
  	var blogs = []
    var params = req['params']
    var query = req.query
    var url = req.url
    var x = req.url.indexOf('?')
    if (x > 0) {
    	url = url.substring(0, x)
    }
    var pre = '/api/blog'
    url = url.substring(pre.length, url.length)
    var offset = query['offset'] || 0
    var limit = query['limit'] || 10
    var c = 0
    var keys = Object.keys(blogmetadata_map)
    for (var i=0; i < keys.length; i++) {
    	var key = keys[i]
    	var blog = blogmetadata_map[key]
    	var match = false
    	if (blog['prettyname'].indexOf(url) == 0) {
    		match = true
    	}
    	if (url == '/') {
	    	for (ex in exclude) {
	    		if (blog['prettyname'].indexOf(ex) == 0) {
					match = false
                }
            }
        }
    	if (match) {
    		if (c >= offset) {
    			blogs.push(blog)
    		}
    		c += 1
    		if (blogs.length >= limit) {
				return res.status(200).end(JSON.stringify(blogs))
    		}
    	}
    }
	return res.status(200).end(JSON.stringify(blogs))
  }
}