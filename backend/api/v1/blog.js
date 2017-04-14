const express = require('express');
const router = express.Router();

const BlogServices = require('../../modules/blog/services/BlogService');

router.get('/', (req, res) => {
    res.send('Posts');
});

const generatePrettyName = (category, year, name) => `/${category}/${year}/${name}`;

router.get('/:category/:year/:name', (req, res) => {
    const prettyName = generatePrettyName(req.params.category, req.params.year, req.params.name);


    BlogServices.getPost(prettyName)
        .then((data) => {
            res.send({data});
        })
        .catch((err) => {
            res.send(err);
        })


});

module.exports = router;