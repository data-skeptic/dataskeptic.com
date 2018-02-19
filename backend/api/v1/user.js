import express from 'express'
import axios from "axios";
import {getPlaylistEpisodes} from "../../../shared/utils/redux_loader";

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../../config/config.json')
const base_url = c[env]['base_api'] + env

const NOT_EXIST_LIST_ERROR = `Requested list is not exist.`
const UNAUTHORIZED = 'User not authenticated'

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

const updateUserSessionList = (user, list, blogId, insertMode = false) => {
    // copy list
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

    // update user session list
    user.lists[list] = listToUpdate
}

const joinList = (list, key) =>
	list.reduce(function(a, curr) {
		return [...a, curr[key]];
	}, []);

const getUserPlaylist = (email) => axios.get(`${base_url}/user/playlist/list?email=${email}$`).then((res) => joinList(res.data, 'blog_id'))

const addUserPlaylist = (data) => axios.post(`${base_url}/user/playlist/add_all`, data).then(res => res.data)

const updateUser = (list, data) => {
    const url = `${base_url}/user/${getListUpdateEndpoint(list)}/update`

	  return axios.post(url, data).then(res => res.data)
}

module.exports = () => {
    const router = express.Router()

    router.use((req, res, next) => {
	    /**
       * /api/v1/* routes could be only accessible
       * if user logged in
	     */
	    if ( req.isAuthenticated() ) {
	      // prevent unauthorized access
		    return next()
	    }

	    res.setStatus(401).send({
        success: false,
        error: UNAUTHORIZED
	    })
    })

    router.all('/session', (req, res) => {
	    res.send(req.user)
    })

		router.post('/playlist/add_all', async (req, res, next) => {
			const result = await addUserPlaylist({
				...req.body,
				email: req.user.email
			})

			setInterval(() => {
				getUserPlaylist(req.user.email)
					.then((playlist) => {
						req.user.lists[playlist] = playlist
						return getPlaylistEpisodes(playlist)
					})
					.then((playlistEpisodes) => {
						return res.send({
							success: true,
							playlistEpisodes
						})
					})
					.catch(error => {
						return res.send({
							success: false,
							error: error
						})
					})
			}, 2000)
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
              insertMode = item.played === 1.0
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
		          result: req.user
	          })
          })
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
