const express = require('express');
const Influx = require('influx');
const sanitizeHtml = require('sanitize-html');
const truncate = require('truncate');

const jobs_util = require('./jobs_util')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

var elasticsearch = require('elasticsearch')

var elastic_search_endpoint = process.env.ELASTIC_SEARCH_ENDPOINT

function format_results(hits) {
	var results = []
	for (var hit of hits) {
		var id           = hit['_id']
		var title        = hit['_source']['title']
		var created_at   = hit['_source']['created_at']
		var location     = hit['_source']['location']
		var type         = hit['_source']['type']
		var raw_desc     = hit['_source']['description']
		var company      = hit['_source']['company']
		var company_url  = hit['_source']['company_url']
		var company_logo = hit['_source']['company_logo']
		var url          = hit['_source']['url']
		var full_description = sanitizeHtml(raw_desc, {allowedTags: ['a'], allowedAttributes:{'a': ['href']}})
		var description = truncate(full_description, 512)
		var result = { id, title, created_at, location, type, description, full_description, company, company_url, company_logo, url }
		results.push(result)
	}
	return results
}

function get_jobs_query(q, location) {
	// lat / lng
	// date range: elastic search data needs to know the datetime type
	var pageNum = 0
	var perPage = 1
	var es_query = {
		index: 'github_jobs',
		type: 'jobs',
		from: (pageNum - 1) * perPage,
		size: perPage,
		body: {
			query: {
				bool: {
					must: [{
						multi_match: {
							query: q,
							fields: ["title", "description"]
						}
					},
					{
						multi_match: {
							query: location,
							fields: ["location"]
						}
					}]
				}
			}
		}
	}	
	return es_query
}

module.exports = {format_results, get_jobs_query}