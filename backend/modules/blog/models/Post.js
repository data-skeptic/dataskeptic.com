const Post = data => ({
  id: data.hash,
  apiUrl: `/api/v1/blog${data['prettyname']}`,

  prettyname: data['prettyname'],
  url: data['prettyname'],
  title: data['title'],
  content: data['content'] || '',

  isEpisode: data['isEpisode'] || false,

  contributor: data['contributor'],
  related: data['related'],

  rendered: data['src_file'],

  renderedAt: data['last_rendered'],
  publishedAt: data['publish_date'],

  author: data['author'],

  env: data['env']
})

export default Post
