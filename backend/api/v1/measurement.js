const express = require('express');

/**
 * For first lets create a router handler for
 */
module.exports = (cache) => {
    const router = express.Router();

    router.get('/', function (req, res) {
        // you still can access Cache via cache variable
        res.send('all?')
    });

    // relevant to the /api/v1/measurement/%whatever%/tags url
    router.get('/:id/tags', function (req, res) {
        // taking url params
        const id = req.params.id

        res.send({
          id: id
        })
    })

    return router;
}