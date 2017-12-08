import express from 'express'

const router = express.Router()

const paginate = (source) => {

}

export default function (cache) {

    router.get('/cache', (req, res) => {
        res.send(cache)
    })

    router.get('/blogs', (req, res) => {
        res.send(cache.blogs)
    })

    router.get('/episodes', (req, res) => {
        res.send(cache.episodes)
    })

    router.get('/latestEpisode', (req, res) => {
        res.send(cache.latestEpisode)
    })

    router.get('/categories', (req, res) => {
        res.send(cache.categories)
    })

    return router
}