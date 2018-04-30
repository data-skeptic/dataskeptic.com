import express from 'express'
import multer from 'multer'
import aws from 'aws-sdk'
import path from 'path'
import mime from 'mime'
import {
  isLogicalEmpty,
  fileExistS3,
  formatPublicLink,
  uploadFilesToBucket,
  getExtension
} from './filesUtils'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const temp_files = process.env.TEMP_FILES
const dest = path.resolve(__dirname, '../../../', temp_files)

const s3 = new aws.S3()
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, dest)
  },
  filename: function(req, file, cb) {
    let fileName

    if (req.query.saveOrigin) {
      fileName = file.originalname
    } else {
      fileName =
        file.originalname +
        '-' +
        Date.now() +
        '.' +
        mime.getExtension(file.mimetype)
    }

    cb(null, fileName)
  }
})

module.exports = cache => {
  const router = express.Router()

  const upload = multer({
    storage: storage
  }).array('files')

  router.put('/upload', (req, res) => {
    let { bucket, prefix } = req.query

    if (isLogicalEmpty(bucket)) {
      return res.status(500).send({
        success: false,
        error: `Bucket couldn't be empty`
      })
    }

    try {
      upload(req, res, async err => {
        if (err) {
          res.status(500).send({
            success: false,
            error: err.message
          })
        } else {
          const files = req.files.map(file => file.filename)
          await uploadFilesToBucket(files, bucket, prefix)

          res.send({
            success: true,
            files: files.map(file => formatPublicLink(file, bucket, prefix))
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err.message
      })
    }
  })

  router.get('/download/:key', (req, res) => {
    const { bucket } = req.query
    const { key } = req.params

    serveS3File(key, bucket, req, res)
  })

  function serveS3File(Key, Bucket, req, res) {
    const params = { Key, Bucket }

    return fileExistS3(params)
      .then(() => {
        const fileStream = s3.getObject(params).createReadStream()
        fileStream.pipe(res)
      })
      .catch(() => {
        res.status(404).send({
          success: false,
          error: `No such file`,
          Key,
          Bucket
        })
      })
  }

  return router
}
