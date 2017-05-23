const express = require('express');
const router = express.Router();

const EpisodesServices = require('../../modules/episodes/services/EpisodesServices');
module.exports = (cache) => {
    const router = express.Router();
    router.get('/list', function (req, res) {

        const params = req['params'];
        const query = req.query;

        let url = req.url;
        const x = req.url.indexOf('?');
        if (x > 0) {
            url = url.substring(0, x)
        }

        const offset = query['offset'] || 0;
        const limit = query['limit'] || 10;

        const pre = '/api/v1/episodes';
        url = url.substring(pre.length, url.length);

        EpisodesServices.getAll(url, cache.episodes_map, offset, limit, global.env)
            .then((episodes) => {
                res.send(episodes);
            })
            .catch((err) => {
                res.send(err);
            })
    });

    router.get('/latest', function (req, res) {
        res.send('Latest episodes');
    });
    return router
};