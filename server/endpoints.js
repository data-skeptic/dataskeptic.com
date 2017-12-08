import express from 'express'
import filter from 'lodash/Filter'

const router = express.Router()

const PER_PAGE = 10;

const offset = (page) => (page - 1) * PER_PAGE + 1

const generatePrettyName = (category, year, name) => `/${category}/${year}/${name}`;

const paginationMeta = (total, itemsPerPage, currentPage) => ({
    total,
    perPage: itemsPerPage,
    currentPage: currentPage,
    lastPage: Math.ceil(total / itemsPerPage),
    from: ((currentPage -1) * itemsPerPage) + 1,
    to: currentPage  * itemsPerPage
})

const paginate = (items, from, to) => filter(items, ({order}) => order >= from && order <= to)

export default function (cache) {

    router.get('/home', (req, res) => {
        res.send({
            latestEpisode: cache.latestEpisode,
            latestBlog: cache.latestPost,
            latestSponsor: cache.sponsor,
            latestCard: cache.card
        })
    })

    router.get('/blogs/', (req, res) => {
        const page = 1;

        const total = Object.keys(cache.blogs).length
        const pagination = paginationMeta(total, PER_PAGE, page)
        const posts = paginate(cache.blogs, pagination.from, pagination.to)

        res.send({
            posts,
            ...pagination
        })
    })

    router.get('/blogs/:page', (req, res) => {
        const { page } = req.params

        const total = Object.keys(cache.blogs).length
        const pagination = paginationMeta(total, PER_PAGE, page)
        const posts = paginate(cache.blogs, pagination.from, pagination.to)

        res.send({
            posts,
            ...pagination
        })
    })

    router.get('/blogs/:category/:year/:name', (req, res) => {
        const prettyName = generatePrettyName(req.params.category, req.params.year, req.params.name);
        const post = cache.blogs[prettyName]
        res.send(post)
    })

    router.get('/episodes', (req, res) => {
        res.send(cache.episodes)
    })

    router.get('/episodes/:year/:name', (req, res) => {
        const prettyName = generatePrettyName(`episodes`, req.params.year, req.params.name);
        res.send(`${prettyName}`)
    })

    router.get('/latestEpisode', (req, res) => {
        res.send(cache.latestEpisode)
    })

    router.get('/categories', (req, res) => {
        res.send(cache.categories)
    })

    return router
}