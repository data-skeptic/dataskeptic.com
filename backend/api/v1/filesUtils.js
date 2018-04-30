import fs from 'fs'
import path from 'path'
import aws from 'aws-sdk'
const s3 = new aws.S3()

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const temp_files = process.env.TEMP_FILES
const dest = path.resolve(__dirname, '../../../', temp_files)

export const getExtension = file =>
  file.slice((Math.max(0, file.lastIndexOf('.')) || Infinity) + 1)

export const uploadFileToBucket = (fileName, Bucket, prefix) => {
  prefix = prefix ? prefix + '/' : ''

  const filePath = path.join(dest, fileName)
  const Body = fs.readFileSync(filePath)
  const Key = `${prefix}${fileName}`
  const s3Path = `${Bucket}${Key}`
  const params = {
    Bucket,
    Key,
    Body,
    ContentEncoding: 'base64',
    ACL: 'public-read'
  }

  return s3
    .upload(params)
    .promise()
    .then(() => fs.unlinkSync(filePath))
    .then(() => s3Path)
}

export const uploadFilesToBucket = (files, bucket, prefix) => {
  return Promise.all(
    files.map(file => uploadFileToBucket(file, bucket, prefix))
  )
}

export const fileExistS3 = params => {
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

export const formatPublicLink = (filename, bucket, prefix) => {
  prefix = prefix ? '/' + prefix : ''

  return `https://s3.amazonaws.com/${bucket}${prefix}/${filename}`
}

export const isLogicalEmpty = val =>
  !val || val === 'null' || val === 'undefined'

export const move = (Bucket, CopySource, OldKey, NextKey) => {
  return s3
    .copyObject({
      Bucket,
      CopySource,
      Key: NextKey,
      ContentEncoding: 'base64',
      ACL: 'public-read'
    })
    .promise()
    .then(() =>
      // Delete the old object
      s3
        .deleteObject({
          Bucket,
          Key: OldKey
        })
        .promise()
        .then(() => `${Bucket}/${NextKey}`)
    )
}
