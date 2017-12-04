import Link from './components/Link';
const router = module.exports = require('next-routes')({

})


const routes = [
  {
    name: 'Blog',
    pattern: '/blogs/:id',
    page:'/blogs/details'
  }
]

routes.map(route => {
  router.add(route);
})

export default router;
