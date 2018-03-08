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

const uploadFileToBucket = (Key, Bucket) => {
  const filePath = path.join(dest, Key)
  const Body = fs.readFileSync(filePath)
  
  const params = {
    Bucket,
    Key,
    Body,
    ContentEncoding: "base64",
    ACL: "public-read"
  }

  return s3
    .upload(params)
    .promise()
    .then(() => fs.unlinkSync(filePath))
}

const uploadFilesToBucket = (files, bucket) => {
  return Promise.all(files.map(file => uploadFileToBucket(file, bucket)))
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

const formatPublicLink = (filename, bucket) => {
  return `https://s3.amazonaws.com/${bucket}/${filename}`
}

module.exports = cache => {
  const router = express.Router()

  const upload = multer({
    storage: storage
  }).array("files")

  router.put("/upload", (req, res) => {
    const { bucket } = req.query
    if (!bucket) {
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
          await uploadFilesToBucket(files, bucket)

          res.send({
            success: true,
            files: files.map(file => formatPublicLink(file, bucket))
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

    if (bucket) {
      serveS3File(key, bucket, req, res)
    } else {
      serveLocalFile(key, req, res)
    }
  })

  function serveLocalFile(key, req, res) {
    const filePath = path.join(dest, key)
    const type = mime.getType(filePath)

    if (fileExistLocally(filePath)) {
      const stream = fs.createReadStream(filePath)

      stream.on("open", () => {
        res.set("Content-Type", type)
        stream.pipe(res)
      })

      stream.on("error", err => {
        res.status(404).send({
          success: false,
          error: err.message
        })
      })
    } else {
      res.status(404).send({
        success: false,
        error: `No such file`,
        file: key
      })
    }
  }

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
