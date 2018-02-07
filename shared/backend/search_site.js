var elasticsearch = require('elasticsearch')

module.exports = {
	search_site: function(req, res, elastic_search_endpoint) {
		const query = req.query
		var q = query['q']
		var client = new elasticsearch.Client({
			host: elastic_search_endpoint,
			log: 'trace'
		});
		client.search({
			index: 'search_v1',
			type: 'blog',
			body: {
				query: {
					match: {
						title: q
					}
				}
			}
		}).then(function (resp) {
			var hits = resp['hits']['hits']
			var results = []
			for (var hit of hits) {
				var blog_id      = hit['_id']
				var title        = hit['_source']['title']
				var author       = hit['_source']['author']
				var abstract     = hit['_source']['abstract']
				var date_created = hit['_source']['date_created']
				var result = { blog_id, title, author, abstract, date_created }
				results.push(result)
			}
		    return res.status(200).end(JSON.stringify(results))
		}, function (err) {
		    return res.status(500).end(JSON.stringify(err.message))
		});
	}
}