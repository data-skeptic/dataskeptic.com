import * as MailServices from '../../modules/mail/services/MailServices'
import moment from 'moment/moment'
import { move } from './filesUtils'
const express = require('express')
const axios = require('axios')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_api = process.env.BASE_API
const EMAIL_ADDRESS = process.env.CAREERS_EMAIL_ADMIN

const formatResumeLink = resume => `https://s3.amazonaws.com/${resume}`

const registerUser = ({ email }) => {
  const data = {
    tag_id: 1,
    email
  }

  return axios.post(base_api + '/drip/user/add', data).then(res => res.data)
}

const getCityData = cityId => {
  const url = base_api + `/careers/home?location=${cityId}`
  return axios.get(url).then(res => res.data)
}

const commitResume = ({ email, resume, Bucket }) => {
  const subpath = env === 'dev' ? 'dev' : 'career_page1'
  const ObjectPath = resume.replace('https://s3.amazonaws.com/', '')
  const Key = ObjectPath.replace(Bucket + '/', '')
  let nextKey = `resumes/${subpath}/${moment().format('YYYY-MM')}/`
  if (email) {
    nextKey += email + '_'
  }

  nextKey += Key

  return move(Bucket, ObjectPath, Key, nextKey)
}

module.exports = cache => {
  const router = express.Router()

  router.post('/', (req, res) => {
    const { email, notify, subscribe } = req.body

    return commitResume(req.body)
      .then(resume => {
        const message = {
          msg: `
        Candidate just uploaded resume ${formatResumeLink(resume)}.</br>
        Notify: ${notify ? 'Checked' : 'Unchecked'}</br>
        Send periodic: ${subscribe ? 'Send' : 'No'}</br>
        
        Try reach him by ${email}
      `,
          subject: `dataskeptic.com account created`,
          to: EMAIL_ADDRESS
        }

        MailServices.sendMail(message)
      })
      .then(() => {
        if (email) {
          return registerUser(req.body)
        }
      })
      .then(() => {
        res.send({ success: true })
      })
      .catch(error => res.send({ success: false, error: error.message }))
  })

  router.get('/drip/content/rate', (req, res) => {
    var drip_user_id = req.query.drip_user_id
    var send_id = req.query.send_id
    var rate = req.query.rate
    var url = base_api + `/drip/content/rate`
    var data = { drip_user_id, send_id, rate }
    return axios
      .post(url, data)
      .then(function(result) {
        console.log(result)
        res.redirect('/drip-result?rate=true')
      })
      .catch(error => res.send({ success: false, error: error.message }))
  })

  router.get('/drip/unsubscribe', (req, res) => {
    var drip_user_id = req.query.drip_user_id
    var send_id = req.query.send_id
    var url = base_api + `/drip/unsubscribe`
    var data = { drip_user_id, send_id }
    console.log(url)
    console.log(data)
    return axios
      .post(url, data)
      .then(function(result) {
        console.log(result)
        res.redirect('/drip-unsubscribe')
      })
      .catch(error => res.send({ success: false, error: error.message }))
  })

  router.get('/city/:cityId', (req, res) => {
    const { cityId } = req.params

    return getCityData(cityId)
      .then(data => res.send(data))
      .then(error => res.status(404).send({ error }))
  })

  return router
}
