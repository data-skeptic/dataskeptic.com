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
        name: 'Page',
        pattern: '/blog/:page',
        page: '/blog'
    },
    {
        name: 'Podcasts',
        pattern: '/podcasts/:year',
        page: '/podcasts'
    },
    {
        name: 'Podcast',
        pattern: '/podcasts/:year/:name',
        page: '/podcasts/details'
    }
]

routes.map(route => {
    router.add(route);
})

export default router;
