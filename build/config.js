const path = require('path')
const fs = require('fs')
const dotenvPath = path.resolve(__dirname, '../.env.example')

function parse (src) {
  const keys = []

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      keys.push(key)
    }
  })

  return keys
}

const variables = {}
const parsedKeys = parse(fs.readFileSync(dotenvPath))
parsedKeys.forEach((key) => {
  variables[key] = process.env[key]
})

module.exports = parsedKeys
