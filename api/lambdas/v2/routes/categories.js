import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    const list = [{
        "id":1,
        "label":"All",
        "prettyName":"all"
    }, {
        "id":2,
        "label":"Book Reviews",
        "prettyName":"book-reviews"
    }, {
        "id":3,
        "label":"Data Collection",
        "prettyName":"data-collection"
    }, {
        "id":4,
        "label":"Episodes",
        "prettyName":"episodes"
    }, {
        "id":5,
        "label":"Infrastructure",
        "prettyName":"infrastructure"
    }, {
        "id":6,
        "label":"Meta",
        "prettyName":"meta"
    }, {
        "id":7,
        "label":"Methods",
        "prettyName":"methods"
    }, {
        "id":8,
        "label":"News",
        "prettyName":"news"
    }, {
        "id":9,
        "label":"Open House",
        "prettyName":"open-house"
    }, {
        "id":10,
        "label":"Opinions",
        "prettyName":"opinions"
    }, {
        "id":11,
        "label":"Podcasting",
        "prettyName":"podcasting"
    }, {
        "id":12,
        "label":"Projects",
        "prettyName":"projects"
    }, {
        "id":13,
        "label":"Skeptical Analysis",
        "prettyName":"skeptical-analysis"
    }, {
        "id":14,
        "label":"Tools-and-techniques",
        "prettyName":"tools-and-techniques"
    }, {
        "id":15,
        "label":"Transcripts",
        "prettyName":"transcripts"
    }]

    res.send(list)
})

router.get('/:id', (req, res) => {
    const post = {
        "id":1,
        "label":"All",
        "prettyName":"all"
    }

    res.send(post)
})


module.exports = router