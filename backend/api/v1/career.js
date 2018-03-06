import * as MailServices from "../../modules/mail/services/MailServices";

const express = require("express")
const aws = require("aws-sdk")
const s3 = require("aws-sdk")
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const mime = require("mime")

const c = require("../../../config/config.json")
const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"

const CAREERS_FILES_BUCKET = c[env]['careers']['filesBucket']
const temp_files = c[env]['recording']['temp_files']
const EMAIL_ADDRESS = c[env]['careers']['email']

function uploadFile(file) {
  console.log("[CAREER] upload proposal file")
  const filesBucket = new aws.S3({ params: { Bucket: CAREERS_FILES_BUCKET } })
  console.dir(file)

  return new Promise((res, rej) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        rej(err)
      }

      filesBucket.createBucket(() => {
        const params = {
          Key: file.filename,
          Body: data
        }

        filesBucket.upload(params, (err, data) => {
          if (err) {
            rej(err)
          } else {
            res(data)
          }
        })
      })
    })
  })
}


function uploadFilesS3Async(files, aws_files_bucket) {
  return Promise.all(
    files.map(file => uploadFile(file, aws_files_bucket))
  ).catch(e => {
    console.error(e)
  })
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "../../../", temp_files))
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + mime.getExtension(file.mimetype)
    )
  }
})

const formatResumeLink = resume => resume

module.exports = cache => {
  const router = express.Router()

  router.put("/upload", (req, res) => {
    const upload = multer({
      storage: storage
    }).array("files")

    upload(req, res, function(err) {
      if (err) {
        console.error(err)
        res.send({
          success: false,
          error: err.message
        })
      } else {
        uploadFilesS3Async(req.files, CAREERS_FILES_BUCKET)

        res.send({
          success: true,
          files: req.files.map(file => file.filename)
        })
      }
    })
  })

  router.post("/", (req, res) => {
    const { email, notify, resume } = req.body
    
    const message = {
      msg: `
        Candidate just uploaded resume ${formatResumeLink(resume)}.</br>
        Notify: ${notify ? 'Checked' : 'Unchecked'}</br>
        
        Try reach him by ${email}
      `,
      subject: `dataskeptic.com account created`,
      to: EMAIL_ADDRESS
    }
    
    return MailServices.sendMail(message)
      .then(() => res.send({success: true}))
      .catch((error) => res.send({success: false, error: error.message}))
  })

  return router
}
