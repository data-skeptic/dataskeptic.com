const express = require('express')
const Influx = require('influx')
const sanitizeHtml = require('sanitize-html')
const truncate = require('truncate')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

var elasticsearch = require('elasticsearch')
var elastic_search_endpoint = process.env.ELASTIC_SEARCH_ENDPOINT

function format_results(hits) {
  var results = []
  for (var hit of hits) {
    var id = hit['_id']
    var title = hit['_source']['title']
    var created_at = hit['_source']['created_at']
    var location = hit['_source']['location']
    var type = hit['_source']['type']
    var raw_desc = hit['_source']['description']
    var company = hit['_source']['company']
    var company_url = hit['_source']['company_url']
    var company_logo = hit['_source']['company_logo']
    var url = hit['_source']['url']
    var score = hit['_score']
    var full_description = sanitizeHtml(raw_desc, {
      allowedTags: ['a'],
      allowedAttributes: { a: ['href'] }
    })
    var description = truncate(full_description, 512)
    var result = {
      id,
      title,
      created_at,
      location,
      type,
      description,
      full_description,
      company,
      company_url,
      company_logo,
      url,
      score
    }
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
    size: 10,
    body: {
      query: {
        function_score: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: q,
                    fields: ['title', 'description']
                  }
                },
                {
                  multi_match: {
                    query: location,
                    fields: ['location*']
                  }
                }
              ],
              filter: {
                range: {
                  created_at: {
                    gte: 'now-30d/d'
                  }
                }
              }
            }
          },
          functions: [
            {
              gauss: {
                created_at: {
                  origin: 'now-3d/d',
                  scale: '3d',
                  offset: '3d',
                  decay: 0.1
                }
              }
            }
          ]
        }
      }
    }
  }
  return es_query
}

async function getJobs(q, location) {
  return new Promise((resolve, reject) => {
    const client = new elasticsearch.Client({
      host: elastic_search_endpoint,
      log: 'warning'
    })

    const es_query = get_jobs_query(q, location)
    client.search(es_query).then(
      function(resp) {
        var hits = resp['hits']['hits']
        var results = format_results(hits)
        return resolve(results)
      },
      function(err) {
        return reject(err)
      }
    )
  })
}

const extractLocation = req => {
  const city = req.session.ipInfo && req.session.ipInfo.city

  let location = req.query.location || city || "don't match"

  return location.toLowerCase()
}

module.exports = {
  getJobs,
  extractLocation,
  get_jobs_query,
  format_results
}
