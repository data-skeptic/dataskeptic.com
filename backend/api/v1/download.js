import express from 'express'
import aws from 'aws-sdk'

const checkFileExist = (s3, params) =>
  new Promise((res, rej) => {
    s3.getObject(params, function(err, data) {
      if (err) return rej(err)

      return res(data)
    })
  })

const normalizePath = path =>
  path.indexOf('/') === 0 ? path.replace('/', '') : path

module.exports = () => {
  const router = express.Router()

  router.all('/', (req, res) => {
    let { bucket, path } = req.query
    path = normalizePath(path)

    const s3 = new aws.S3({ params: { Bucket: bucket } })
    const fileParams = { Bucket: bucket, Key: path }

    checkFileExist(s3, fileParams)
      .then(() => {
        const fileStream = s3.getObject(fileParams).createReadStream()
        fileStream.pipe(res)
      })
      .catch(err => {
        res.send(err)
      })
  })

  return router
}
