const winston = require('winston')
const S3StreamLogger = require('s3-streamlogger').S3StreamLogger

const bucket_name = process.env.CHAT_LOGS

const ops = {
  bucket: bucket_name,
  folder: 'chat_logs/'
}

const s3_stream = new S3StreamLogger(ops)

const transport = new winston.transports.File({
  stream: s3_stream
})

// see error handling section below
transport.on('error', function(err) {
  /* ... */
})

const logger = new winston.Logger({
  transports: [transport]
})

export const logMessage = message => {
  const s = JSON.stringify(message)
  logger.info(s)
}
