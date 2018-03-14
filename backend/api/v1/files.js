import express from "express"
import multer from "multer"
import aws from "aws-sdk"
import path from "path"
import fse from "fs-extra"
import fs from "fs"
import mime from "mime"

const c = require("../../../config/config.json")
const temp_files = c[env]["files"]["folder"]
const dest = path.resolve(__dirname, "../../../", temp_files)

const s3 = new aws.S3()
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, dest)
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + mime.getExtension(file.mimetype)
    )
  }
})

const uploadFileToBucket = (fileName, Bucket, prefix) => {
  prefix = prefix ? prefix + "/" : ""
  
  const filePath = path.join(dest, fileName)
  const Body = fs.readFileSync(filePath)
  const Key = `${prefix}${fileName}`
  const s3Path = `${Bucket}${Key}`
  const params = {
    Bucket,
    Key,
    Body,
    ContentEncoding: "base64",
    ACL: "public-read"
  }

  console.dir(Key)

  return s3
    .upload(params)
    .promise()
    .then(() => fs.unlinkSync(filePath))
    .then(() => s3Path)
}

const uploadFilesToBucket = (files, bucket, prefix) => {
  return Promise.all(
    files.map(file => uploadFileToBucket(file, bucket, prefix))
  )
}

const fileExistS3 = params => {
  return s3
    .headObject(params)
    .promise()
    .then(() => true)
    .catch(() => false)
}

const fileExistLocally = file => {
  let exist = false

  try {
    fs.statSync(file)
    exist = true
  } catch (err) {}

  return exist
}

const formatPublicLink = (filename, bucket, prefix) => {
  prefix = prefix ? "/" + prefix : ""

  return `https://s3.amazonaws.com/${bucket}${prefix}/${filename}`
}

const isLogicalEmpty = val => !val || val === "null" || val === "undefined"

module.exports = cache => {
  const router = express.Router()

  const upload = multer({
    storage: storage
  }).array("files")

  router.put("/upload", (req, res) => {
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

  router.get("/download/:key", (req, res) => {
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
