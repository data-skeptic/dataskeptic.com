import express from 'express'
import axios from 'axios'

const base_url = process.env.BASE_API

const NOT_EXIST_LIST_ERROR = `Requested list is not exist.`
const UNAUTHORIZED = 'User not authenticated'

const PLAYED = 'played'
const FAVORITE = 'favorites'
const PLAYLIST = 'playlist'

const lists = [PLAYED, FAVORITE, PLAYLIST]

const listsEndpointMap = {
  [PLAYED]: 'played',
  [FAVORITE]: 'favorite',
  [PLAYLIST]: 'playlist'
}

const isAcceptedList = list => lists.indexOf(list) > -1

const getListUpdateEndpoint = list => listsEndpointMap[list]

const updateUserSessionList = (user, list, blogId, insertMode = false) => {
  let listToUpdate = [...user.lists[list]]

  // add / remove item
  if (insertMode) {
    // avoid duplications
    if (listToUpdate.indexOf(blogId) === -1) {
      listToUpdate.push(blogId)
    }
  } else {
    listToUpdate = listToUpdate.filter(i => i !== blogId)
  }

  return listToUpdate
}

const joinList = (list, key) =>
  list.reduce(function(a, curr) {
    return [...a, curr[key]]
  }, [])

const getUserPlaylist = email =>
  axios
    .get(`${base_url}/user/playlist/list?email=${email}&limit=1000&offset=0`)
    .then(res => joinList(res.data, 'blog_id'))

const addUserPlaylist = data =>
  axios.post(`${base_url}/user/playlist/add_all`, data).then(res => res.data)

const updateUser = (list, data) => {
  const url = `${base_url}/user/${getListUpdateEndpoint(list)}/update`

  return axios.post(url, data).then(res => res.data)
}

const getUserDownloads = email =>
  axios
    .get(`${base_url}/members/downloads?email=${email}`)
    .then(res => res.data)

module.exports = () => {
  const router = express.Router()

  router.use((req, res, next) => {
    /**
     * /api/v1/* routes could be only accessible
     * if user logged in
     */
    if (req.isAuthenticated()) {
      // prevent unauthorized access
      return next()
    }

    res.status(401).send({
      success: false,
      error: UNAUTHORIZED
    })
  })

  router.all('/session', (req, res) => {
    res.send(req.user)
  })

  router.post('/playlist/add_all', async (req, res, next) => {
    const data = {
      ...req.body,
      email: req.user.email
    }

    addUserPlaylist(data)
      .then(() => getUserPlaylist(req.user.email))
      .then(playlist => {
        req.user.lists.playlist = playlist
        return res.send({
          success: true,
          playlist
        })
      })
      .catch(error => {
        return res.send({
          success: false,
          error: error
        })
      })
  })

  router.post('/:list/update', (req, res) => {
    const { list } = req.params
    if (!isAcceptedList(list)) {
      return res.send({
        success: false,
        error: NOT_EXIST_LIST_ERROR
      })
    }

    const item = {
      ...req.body,
      email: req.user.email
    }

    let insertMode = false
    switch (list) {
      case PLAYED:
        insertMode = item.played === 1.0
        break

      case FAVORITE:
        insertMode = item.favorited
        break

      case PLAYLIST:
        insertMode = item.add
        break
    }

    req.user.lists[list] = updateUserSessionList(
      req.user,
      list,
      item.blog_id,
      insertMode
    )

    // trigger async lambda backend
    updateUser(list, item)

    req.login(req.user, function(err) {
      if (err) {
        return res.send({
          success: false,
          error: error
        })
      }

      res.send({
        success: true
      })
    })
  })

  router.get('/downloads', (req, res) => {
    const userEmail = req.user.email

    getUserDownloads(userEmail)
      .then(data => res.send(data))
      .catch(error => {
        console.dir(error)
        return res.send({
          success: false,
          error: error
        })
      })
  })

  return router
}
