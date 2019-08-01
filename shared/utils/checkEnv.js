import { isEmpty } from 'lodash'
import path from 'path'

const example = path.resolve(__dirname + '../../../' + '.env.example')

export default () => {
  require('dotenv-safe').config({
    allowEmptyValues: true,
    example
  })
}
