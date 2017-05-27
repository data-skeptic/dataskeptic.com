const BASE_URL = 'https://dataskeptic.com/';

const BlogItem = (data, prettyname) => ({

    title: data['title'],
    description: data['desc'],
    url: BASE_URL + 'blog' + prettyname,
    guid: data['guid'],
    author: data['author'],
    categories: '',
    date: Date.parse(data['publish_date'])

});

export default BlogItem;
