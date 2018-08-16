import express from 'express'
import axios from 'axios'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_api = process.env.BASE_API

const getPoll = async (poll_id, user_id) => {
  let url = base_api + `/poll?poll_id=${poll_id}&user_id=${user_id}`
  
  try {
    const pollInfo = await axios.get(url)
    return pollInfo.data
  } catch (err) {
    console.log('Error while getting Poll Info.', err.name)
    throw err
  }
}

const votePoll = async data => {
  const url = `${base_api}/poll/vote`
  
  try {
    const voteResult = await axios.post(url, data)
    return voteResult.data
  } catch (err) {
    console.log('Error while updating vote.', err.name)
    throw err
  }
}

module.exports = cache => {
  const router = express.Router()
  
  router.get('/', async (req, res) => {
    const poll_id = +req.query.poll_id
    const user_id = +req.query.user_id
    
    try {
      const pollInfo = await getPoll(poll_id, user_id)
      
      res.status(200).send(pollInfo);
    } catch (err) {
      res.status(500).send({ success: false, error: err })
    }
  })
  
  router.post('/vote', async (req, res) => {
    const data = req.body
    
    try {
      const voteResult = await votePoll(data)
      res.status(200).send(voteResult)
    } catch (err) {
      res.status(500).send({success: false, error: err})
    }
  })
  
  return router
}
