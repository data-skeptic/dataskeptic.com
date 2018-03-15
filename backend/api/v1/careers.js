import * as MailServices from "../../modules/mail/services/MailServices"
import moment from "moment/moment"
import { move } from "./filesUtils"
const express = require("express")
const axios = require("axios")

const c = require("../../../config/config.json")
const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
const base_api = c[env]["base_api"] + env
const EMAIL_ADDRESS = c[env]["careers"]["email"]

const formatResumeLink = resume => `https://s3.amazonaws.com/${resume}`

const registerUser = ({ email }) => {
  const data = {
    tag_id: 1,
    email
  }

  return axios.post(base_api + "/drip/user/add", data).then(res => res.data)
}

const getCityData = cityId => {
  const url = base_api + `/careers?location=${cityId}`
  return axios.get(url).then(res => res.data)
}

const commitResume = ({ email, resume, Bucket }) => {
  const subpath = env === "dev" ? "dev" : "career_page1"
  const ObjectPath = resume.replace("https://s3.amazonaws.com/", "")
  const Key = ObjectPath.replace(Bucket + "/", "")
  let nextKey = `resumes/${subpath}/${moment().format("YYYY-MM")}/`

  if (email) {
    nextKey += email + "_"
  }

  nextKey += Key

  return move(Bucket, ObjectPath, Key, nextKey)
}

module.exports = cache => {
  const router = express.Router()

  router.post("/", (req, res) => {
    const { email, notify, subscribe } = req.body

    return commitResume(req.body)
      .then(resume => {
        const message = {
          msg: `
        Candidate just uploaded resume ${formatResumeLink(resume)}.</br>
        Notify: ${notify ? "Checked" : "Unchecked"}</br>
        Send periodic: ${subscribe ? "Send" : "No"}</br>
        
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

  router.get("/city/:cityId", (req, res) => {
    const { cityId } = req.params

    const MOCKED_DATA = {
      blogs: [
        {
          blog_id: 347,
          title: "POMDP Retrospective",
          author: "Kyle",
          abstract:
            "In the most recent episode of Data Skeptic, we discussed Partially Observable Markov Decision Processes (POMDPs).  This framework for artificial intelligence is a big topic requiring much deeper discussion than fits well into the podcast format.  If you're looking for a bit more on this subject, a great next step is these slides from Anthony Cassandra.",
          publish_date: "2018-02-26T00:00:00.000Z",
          prettyname: "/methods/2018/pomdp-retrospective",
          src_file: "methods/2018/pomdp-retrospective.htm",
          guid: "",
          related: [
            {
              content_id: 112,
              blog_id: 347,
              dest:
                "https://s3.amazonaws.com/dataskeptic.com/img/2018/fotw/fotw20180226.png",
              type: "homepage-image",
              title: "partially observable markov decision processes POMDP",
              body: "",
              blog_id2: null,
              author: null,
              publish_date: null,
              guid: null,
              prettyname: null
            }
          ],
          contributors: []
        },
        {
          blog_id: 356,
          title: "Jane Doe",
          author: "Kyle",
          abstract: "This is another pro",
          publish_date: "2018-03-01T00:00:00.000Z",
          prettyname: "/careers/2018/chicago/jane-doe",
          src_file: "careers/2018/chicago/profile2.htm",
          guid: "",
          related: [],
          contributors: []
        },
        {
          blog_id: 352,
          title: "JupyterLab",
          author: "Kristine",
          abstract:
            "We recently adopted Jupyterlab at Data Skeptic HQ as our primary Python development procedure, superceeding plain vanilla Jupyter notebooks.  At first, we weren't going to blog about it, until we noticed this one killer feature.",
          publish_date: "2018-03-11T00:00:00.000Z",
          prettyname: "/news/2018/jupyterlab",
          src_file: "news/2018/jupyterlab.htm",
          guid: "",
          related: [
            {
              content_id: 119,
              blog_id: 352,
              dest:
                "https://s3.amazonaws.com/dataskeptic.com/img/2018/fotw/jupyter.png",
              type: "homepage-image",
              title: "Jupyter",
              body: "",
              blog_id2: null,
              author: null,
              publish_date: null,
              guid: null,
              prettyname: null
            }
          ],
          contributors: [
            {
              blog_id: 352,
              contributor_id: 4,
              contribution: "Writer",
              sort_order: 0,
              prettyname: "Kristine de Leon",
              img:
                "https://s3.amazonaws.com/dataskeptic.com/contributors/kristen-de-leon.png",
              twitter: "deleonkrist",
              linkedin: "https://www.linkedin.com/in/kristine-de-leon-a7544149",
              bio:
                "Kristine is a fledgling science writer based in sunny Los Angeles, CA. Once a researcher in soil microbiology, Kristine is passionate about translating science into thrilling stories for all. She enjoys reading, the great outdoors, playing with logical systems, learning how stuff in the world works, and making things with metal.",
              author: "kristine"
            },
            {
              blog_id: 352,
              contributor_id: 1,
              contribution: "Writer",
              sort_order: 1,
              prettyname: "Kyle Polich",
              img:
                "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.jpg",
              twitter: "dataskeptic",
              linkedin: "https://www.linkedin.com/in/kyle-polich-5047193",
              bio:
                "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
              author: "kyle"
            }
          ]
        }
      ],
      events: [
        {
          date: new Date(),
          title: "Event 1",
          description: "Lorem ipsum...",
          preview: ""
        },
        {
          date: new Date(),
          title: "Event 2",
          description: "Lorem ipsum...",
          preview: ""
        },
        {
          date: new Date(),
          title: "Event 3",
          description: "Lorem ipsum...",
          preview: ""
        },
        {
          date: new Date(),
          title: "Event 4",
          description: "Lorem ipsum...",
          preview: ""
        }
      ]
    }

    /// mocked
    return res.send(MOCKED_DATA)

    return getCityData(cityId)
      .then(data => res.send(data))
      .then(error => res.status(404).send({ error }))
  })

  return router
}
