module.exports = {
    get_blogs: function (req, res, blogmetadata_map, exclude = ['/episodes', '/transcripts']) {
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
        var limit = query['limit'] || 30
        var c = 0
        var keys = Object.keys(blogmetadata_map)

        let total = 0;
        let finishedLookup = false;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            if (key !== "latest" && key !== "guid") {
                var blog = blogmetadata_map[key]
                if (!blog) continue;
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
                    if (c >= offset && !finishedLookup) {
                        blogs.push(blog);
                    }
                    c += 1
                    if (blogs.length >= limit) {
                        finishedLookup = true;
                    }

                    total++;
                }
            }
        }
        return res.status(200).end(JSON.stringify({
            blogs,
            total: 100
        }))
    }
}