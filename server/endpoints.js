import express from 'express'
import filter from 'lodash/Filter'

const router = express.Router()

const PER_PAGE = 10;

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
const realPaginate = (items, from, to) =>
    filter(items, (item, realIndex) => realIndex >= from && realIndex <= to)

const filterByCategory = (items, category) =>
    filter(items, (item) => item.category === category)


export default function (cache) {

    router.get('/test', (req, res) => res.send(cache.blogs))

    router.get('/home', (req, res) => {
        res.send({
            latestEpisode: cache.latestEpisode,
            latestBlog: cache.latestPost,
            latestSponsor: cache.sponsor,
            latestCard: cache.card
        })
    })


    router.get('/blogs/:category/:year/:name', (req, res) => {
        const prettyName = generatePrettyName(req.params.category, req.params.year, req.params.name);
        const post = cache.blogs[prettyName]
        res.send(post)
    })

    router.get('/blogs/:category/:page', (req, res) => {
        const { category, page } = req.params

        const source = filterByCategory(cache.posts, category)

        const total = Object.keys(source).length
        const pagination = paginationMeta(total, PER_PAGE, +page)
        const posts = realPaginate(source, pagination.from, pagination.to)

        res.send({
            posts,
            ...pagination,
            category
        })
    })

    router.get('/blogs/:page', (req, res) => {
        const { page } = req.params

        const total = Object.keys(cache.posts).length
        const pagination = paginationMeta(total, PER_PAGE, +page)
        const posts = paginate(cache.posts, pagination.from, pagination.to)

        res.send({
            posts,
            ...pagination
        })
    })

    router.get('/blogs/', (req, res) => {
        const page = 1;

        const total = Object.keys(cache.posts).length
        const pagination = paginationMeta(total, PER_PAGE, +page)
        const posts = paginate(cache.posts, pagination.from, pagination.to)

        res.send({
            posts,
            ...pagination
        })
    })

    router.get('/episodes', (req, res) => {
        const page = 1

        const total = Object.keys(cache.episodes).length
        const pagination = paginationMeta(total, PER_PAGE, page)
        const episodes = paginate(cache.episodes, pagination.from, pagination.to)

        res.send({
            episodes,
            ...pagination
        })
    })

    router.get('/episodes/:page', (req, res) => {
        const { page=1 } = req.params

        const total = Object.keys(cache.episodes).length
        const pagination = paginationMeta(total, PER_PAGE, page)
        const episodes = paginate(cache.episodes, pagination.from, pagination.to)

        res.send({
            episodes,
            ...pagination
        })
    })

    router.get('/episodes/:year/:name', (req, res) => {
        const prettyName = generatePrettyName(`episodes`, req.params.year, req.params.name);
        const post = cache.blogs[prettyName]
        const episode = cache.episodes[post.guid]
        res.send({
            ...post,
            ...episode
        })
    })

    router.get('/latestEpisode', (req, res) => {
        res.send(cache.latestEpisode)
    })

    router.get('/categories', (req, res) => {
        res.send(cache.categories)
    })

    return router
}