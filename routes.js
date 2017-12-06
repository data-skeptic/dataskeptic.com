import Link from './components/Link';
const router = module.exports = require('next-routes')({

})


const routes = [
  {
    name: 'Blog',
    pattern: '/blogs/details/:id',
    page:'/blogs/details'
  },
  {
      name: 'Category',
      pattern: '/blogs/:category',
      page:'/blogs'
  },
  {
    name: 'Podcast',
    pattern: '/podcasts/:year',
    page:'/podcasts'
  }
]

routes.map(route => {
  router.add(route);
})

export default router;
