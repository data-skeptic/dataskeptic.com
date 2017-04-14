const Post = (data) => ({
    id: data.hash,
    apiUrl: `/api/v1/blog${data['prettyname']}`,

    url: data['prettyname'],
    title: data['title'],
    content: data['content'] || '',

    isEpisode: data['isEpisode'] || false,

    contributor: data['contributor'],
    related: data['related'],

    rendered: data['rendered'],

    discoveredAt: data['date_discovered'],
    renderedAt: data['last_rendered'],
    publishedAt: data['publish_date'],

    author: data['author'],

    env: data['env'],

});

export default Post;