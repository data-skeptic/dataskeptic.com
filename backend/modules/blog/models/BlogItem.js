const BASE_URL = 'https://dataskeptic.com/'

const BlogItem = data => ({
  title: data['title'],
  description: data['desc'],
  url: BASE_URL + 'blog' + data['prettyname'],
  guid: data['guid'],
  author: data['author'],
  categories: '',
  date: Date.parse(data['publish_date'])
})

export default BlogItem
