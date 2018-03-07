var elasticsearch = require('elasticsearch')

const c = require('../../../config/config.json')
const env = 'dev'
console.log(c[env])
var elastic_search_endpoint = c[env]['elastic_search_endpoint']
const jobs_util = require('./jobs_util.js')

var q = 'data'
var location = 'new york'

var es_query = jobs_util.get_jobs_query(q, location)
console.log(es_query)

var client = new elasticsearch.Client({
  host: elastic_search_endpoint,
  log: 'debug'
})

return client.search(es_query).then(
  function(resp) {
    var hits = resp['hits']['hits']
    var results = jobs_util.format_results(hits)
    console.log(results)
  },
  function(err) {
    console.log(err)
  }
)
