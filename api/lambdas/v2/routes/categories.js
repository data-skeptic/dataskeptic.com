import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    const list = [{
        "id":1,
        "label":"All"
    }, {
        "id":2,
        "label":"Book Reviews"
    }, {
        "id":3,
        "label":"Data Collection"
    }, {
        "id":4,
        "label":"Episodes"
    }, {
        "id":5,
        "label":"Infrastructure"
    }, {
        "id":6,
        "label":"Meta"
    }, {
        "id":7,
        "label":"Methods"
    }, {
        "id":8,
        "label":"News"
    }, {
        "id":9,
        "label":"Open House"
    }, {
        "id":10,
        "label":"Opinions"
    }, {
        "id":11,
        "label":"Podcasting"
    }, {
        "id":12,
        "label":"Projects"
    }, {
        "id":13,
        "label":"Skeptical Analysis"
    }, {
        "id":14,
        "label":"Tools-and-techniques"
    }, {
        "id":15,
        "label":"Transcripts"
    }]

    res.send(list)
})

router.get('/:id', (req, res) => {
    const post = {
        "id":1,
        "label":"All"
    }

    res.send(post)
})


module.exports = router