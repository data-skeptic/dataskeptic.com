const path = require('path')

function fetchCurrentRFC(proposalsDocs, rfc_table_name, latest_rfc_id) {
  const params = {
    TableName: rfc_table_name,
    Key: {
      id: latest_rfc_id
    }
  }

  return new Promise((res, rej) => {
    proposalsDocs.get(params, function(err, data) {
      if (err) {
        rej(err)
      } else {
        res(data['Item'])
      }
    })
  })
}

module.exports = {
  get_rfc_metadata: function(
    req,
    res,
    my_cache,
    proposalsDocs,
    rfc_table_name,
    latest_rfc_id
  ) {
    var topic =
      'Do you think Tensor Processing Units (TPUs) will totally replace GPUs for deep learning?'
    var description =
      'Deep learning requires GPUs to achieve good results in a reasonable amount of time on many problems.  Presently, it seems unclear whether or not specialized hardware will provide an advantage for general cases.  Google has created the TPU.  Either it or something like it will eventually be available on the market.  At that time, will these eventually sunset GPUs for use in deep learning?'
    var deadline = new Date('2017,03,01, 07, 00, 00')
    // var rfc = {topic, description, deadline}

    fetchCurrentRFC(proposalsDocs, rfc_table_name, latest_rfc_id)
      .then(rfc => {
        return res.status(200).end(JSON.stringify(rfc))
      })
      .catch(err => {
        return res.status(500).end(JSON.stringify(err))
      })
  }
}
