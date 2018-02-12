import express from 'express'
import axios from "axios";

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../../config/config.json')
const base_url = c[env]['base_api'] + env

const PLAYED ='played'
const FAVORITE ='favorites'
const PLAYLIST ='playlist'

const lists = [
	PLAYED,
	FAVORITE,
	PLAYLIST
]

const listsEndpointMap = {
	[PLAYED]: 'played',
	[FAVORITE]: 'favorite',
	[PLAYLIST]: 'playlist',
}

const isAcceptedList = list => lists.indexOf(list) > -1
const getListUpdateEndpoint = list => listsEndpointMap[list]

const NOT_EXIST_LIST_ERROR = `Requested list is not exist.`

const updateUserSessionList = (user, list, blogId, insertMode = false) => {
    console.log(`updateUserSessionList`)
    console.log(user.lists)
    console.log(list)
    if (insertMode) {
        user.lists[list].push(blogId)
    } else {
        user.lists[list] = user.list.filter(blogId !== blogId)
    }
}

const updateUser = (list, data) => {
    const url = `${base_url}/user/${getListUpdateEndpoint(list)}/update`

    console.log(url)
    console.log(data)

	  return axios.post(url, data).then(res => res.data)
}

module.exports = () => {
    const router = express.Router()

    router.all('/session', (req, res) => {
	    res.send(req.user)
    })

    router.post('/:list/update', (req, res) => {
        const {list} = req.params
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
              insertMode = item.played
              break

          case FAVORITE:
              insertMode = item.favorited
              break

          case PLAYLIST:
              insertMode = item.add
              break
        }


        // trigger lambda backend
        updateUser(list, item)
          .then(result => {
            const success = result.status === "ok"

            if (success) {
	            // sync session data
	            updateUserSessionList(req.user, list, item.blog_id, insertMode)
            }

	          res.send({
		          success,
		          result
	          })
          })
          .catch(error => {
	          return res.send({
		          success: false,
		          error: error
	          })
          })
    });

    return router
}
