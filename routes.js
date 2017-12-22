const router = module.exports = require('next-routes')({})

const routes = [
    {
        name: 'Blog',
        pattern: '/blog/:category/:year/:name',
        page: '/blog/details'
    },
    {
        name: 'Category',
        pattern: '/blog/:category',
        page: '/blog'
    },
    {
        name: 'Category Page',
        pattern: '/blog/:category/:page',
        page: '/blog'
    },
    {
        name: 'Page',
        pattern: '/blog/:page',
        page: '/blog'
    },
    {
        name: 'Podcasts Page',
        pattern: '/podcasts/:year(\\d+)/:page(\\d+)/',
        page: '/podcasts'
    },
    {
        name: 'Year Podcasts',
        pattern: '/podcasts/:year',
        page: '/podcasts'
    },
    {
        name: 'Podcasts',
        pattern: '/podcasts/:page',
        page: '/podcasts'
    },
    {
        name: 'Podcast',
        pattern: '/podcasts/:year/:name',
        page: '/podcasts/details'
    },
    {
        name: 'Episode Page',
        pattern: '/blog/episodes/:year/:name',
        page: '/podcasts/details'
    },
    {
        name: 'Transcripts Page',
        pattern: '/blog/episodes/:year/:name',
        page: '/podcasts/details'
    }
]

routes.map(route => {
    router.add(route);
})

export default router;
