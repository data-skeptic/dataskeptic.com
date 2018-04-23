const express = require('express')
const Influx = require('influx')

var influxdb = undefined
const influx_config = process.env.INFLUXDB_ON
console.log('influx_config', process.env.INFLUXDB_ON)
if (influx_config) {
  console.log('initializing influxdb')
  influxdb = new Influx.InfluxDB({
    protocol: 'https',
    host: process.env.INFLUXDB_HOST,
    database: process.env.INFLUXDB_DATABASE,
    port: process.env.INFLUXDB_PORT,
    username: process.env.INFLUXDB_USER,
    password: process.env.INFLUXDB_PASSWORD
  })
  //  options: { ca: ca },
} else {
  console.log('NOT initializing influxdb')
}

function return_influx_result(query, res) {
  if (influxdb) {
    console.log('querying influxdb')
    influxdb
      .query(query)
      .then(function(result) {
        console.log('done')
        res.status(200).end(JSON.stringify(result))
      })
      .catch(function(err) {
        console.log('fail')
        console.log(err)
        console.log(Object.keys(err))
        res.status(500).end(JSON.stringify({ error: 'bad result' }))
      })
  } else {
    console.log('No influx')
    res.status(500).end(JSON.stringify({ error: 'no database connection' }))
  }
}

/**
 * For first lets create a router handler for
 */
module.exports = cache => {
  const router = express.Router()

  router.get('/', function(req, res) {
    // you still can access Cache via cache variable
    res.send('all?')
  })

  router.get('/query', function(req, res) {
    const querystring_dict = req.query
    if ('q' in querystring_dict) {
      var query = querystring_dict['q']
    } else {
      var query = 'SELECT "lat", time from impression where time > now() - 1m'
    }
    console.log(query)
    return_influx_result(query, res)
  })

  router.get('/databases', function(req, res) {
    const query = 'SHOW DATABASES'
    console.log(query)
    return_influx_result(query, res)
  })

  router.get('/measurements', function(req, res) {
    const query = 'SHOW MEASUREMENTS'
    return_influx_result(query, res)
  })

  router.get('/measurement/:measurement/tags', function(req, res) {
    const measurement = req.params.measurement
    var query = `SHOW TAG KEYS FROM ${measurement}`
    return_influx_result(query, res)
  })

  router.get('/measurement/:measurement/fields', function(req, res) {
    const measurement = req.params.measurement
    var query = `SHOW FIELD KEYS FROM ${measurement}`
    return_influx_result(query, res)
  })

  return router
}
