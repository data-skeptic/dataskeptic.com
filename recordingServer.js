const BinaryServer = require('binaryjs').BinaryServer
const wav = require('wav')
const isEmpty = require('lodash').isEmpty

import {
  generateChunkPath,
  startRecording,
  completeRecording,
  convertFileToMp3,
  uploadToS3,
  clearRecordingPath
} from './recordingUtils'

const run = server => {
  const bs = server
    ? BinaryServer({ server: server, path: '/recording' })
    : BinaryServer({ port: 9001 })

  console.log(`Wait for new user connections`)
  bs.on('connection', client => {
    console.dir('connection')

    let fileWriter = null
    client.on('stream', (stream, meta) => {
      console.log('stream')
      console.log('meta', meta)

      const { id, chunkId, sampleRate } = meta
      client.meta = {
        id,
        chunkId
      }
      startRecording(id)

      const filePath = generateChunkPath(id, chunkId)
      console.log('client sample rate:', sampleRate)
      console.log('writing in:', filePath)
      let fileWriter = new wav.FileWriter(filePath, {
        channels: 1,
        sampleRate: sampleRate,
        bitDepth: 16
      })

      stream.pipe(fileWriter)
    })

    client.on('close', () => {
      if (isEmpty(client.meta)) {
        return
      }

      const { id, chunkId } = client.meta

      completeRecording(id)

      console.log('stopped recording')

      convertFileToMp3(id).then(filePath => {
        uploadToS3(filePath, id, (err, data) => {
            if (err) {
                console.log('error')
                console.error(err);
            } else {
                console.log('success')
                console.dir(data);
        
                console.log('Success upload to S3', id);
                clearRecordingPath(id);
            }
        });
      })

      if (fileWriter !== null) {
        fileWriter.end()
      }
    })
  })
}

if (!module.parent) {
  run()
}

export default run
