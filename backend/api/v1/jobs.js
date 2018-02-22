const express = require('express');
const Influx = require('influx');

const c = require('../../../config/config.json')
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

var elasticsearch = require('elasticsearch')

var elastic_search_endpoint = c[env]['elastic_search_endpoint']

module.exports = (cache) => {
    const router = express.Router();

    router.get('/', function (req, res) {
		const query = req.query
		var q = "data"
		console.log("JSEARCH: " + q)
		var client = new elasticsearch.Client({
			host: elastic_search_endpoint,
			log: 'trace'
		});
		var es_query = {
			index: 'github_jobs',
			type: 'jobs',
			body: {
				query: {
					multi_match: {
						"query": q,
						"fields": ["title", "description"]
					}
					//location????
				},
				_source: {
					includes: [
						"id",
						"title",
						"created_at",
						"location",
						"type",
						"description",
						"company",
						"company_url",
						"company_logo",
						"url"
					]
				}
			}
		}
		console.log(es_query)
		client.search(es_query).then(function (resp) {
			var hits = resp['hits']['hits']
			var results = []
			for (var hit of hits) {
				var id           = hit['_id']
				var title        = hit['_source']['title']
				var created_at   = hit['_source']['created_at']
				var location     = hit['_source']['location']
				var type         = hit['_source']['type']
				var description  = hit['_source']['description']
				var company      = hit['_source']['company']
				var company_url  = hit['_source']['company_url']
				var company_logo = hit['_source']['company_logo']
				var url          = hit['_source']['url']
				var result = { id, title, created_at, location, type, description, company, company_url, company_logo, url }
				results.push(result)
			}
		    return res.status(200).end(JSON.stringify(results))
		}, function (err) {
		    return res.status(500).end(JSON.stringify(err.message))
		});
    });

    return router;
}
