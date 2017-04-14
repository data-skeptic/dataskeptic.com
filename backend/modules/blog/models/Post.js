const Post = (data) => ({
    id: data.hash,

    url: data['prettyname'],
    title: data['title'],
    content: '',

    isEpisode: false,

    contributor: null,
    relative: [],

    rendered: data['rendered'],

    discoveredAt: data['date_discovered'],
    renderedAt: data['last_rendered'],
    publishedAt: data['publish_date'],

    author: data['author'],

    env: data['env']
});

export default Post;