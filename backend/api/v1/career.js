import * as MailServices from "../../modules/mail/services/MailServices"
const express = require("express")
const axios = require("axios")

const c = require("../../../config/config.json")
const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
const base_api = c[env]["base_api"] + env
const EMAIL_ADDRESS = c[env]["careers"]["email"]

const formatResumeLink = resume => resume

const registerUser = ({ email }) => {
  const data = {
    tag_id: 1,
    email
  }

  return axios.post(base_api + "/drip/user/add", data).then(res => res.data)
}

module.exports = cache => {
  const router = express.Router()

  const onUpload = data => {
    return registerUser(data)
  }

  router.post("/", (req, res) => {
    const { email, notify, resume } = req.body

    const message = {
      msg: `
        Candidate just uploaded resume ${formatResumeLink(resume)}.</br>
        Notify: ${notify ? "Checked" : "Unchecked"}</br>
        
        Try reach him by ${email}
      `,
      subject: `dataskeptic.com account created`,
      to: EMAIL_ADDRESS
    }

    const flow = email ? onUpload(req.body) : Promise.resolve()

    return flow
      .then(() => MailServices.sendMail(message))
      .then(() => {
        res.send({ success: true })
      })
      .catch(error => res.send({ success: false, error: error.message }))
  })

  return router
}
