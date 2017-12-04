import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    const list = [{
        "id":1,
        "label":"All",
        "prettyname":"all"
    }, {
        "id":2,
        "label":"Book Reviews",
        "prettyname":"book-reviews"
    }, {
        "id":3,
        "label":"Data Collection",
        "prettyname":"data-collection"
    }, {
        "id":4,
        "label":"Episodes",
        "prettyname":"episodes"
    }, {
        "id":5,
        "label":"Infrastructure",
        "prettyname":"infrastructure"
    }, {
        "id":6,
        "label":"Meta",
        "prettyname":"meta"
    }, {
        "id":7,
        "label":"Methods",
        "prettyname":"methods"
    }, {
        "id":8,
        "label":"News",
        "prettyname":"news"
    }, {
        "id":9,
        "label":"Open House",
        "prettyname":"open-house"
    }, {
        "id":10,
        "label":"Opinions",
        "prettyname":"opinions"
    }, {
        "id":11,
        "label":"Podcasting",
        "prettyname":"podcasting"
    }, {
        "id":12,
        "label":"Projects",
        "prettyname":"projects"
    }, {
        "id":13,
        "label":"Skeptical Analysis",
        "prettyname":"skeptical-analysis"
    }, {
        "id":14,
        "label":"Tools-and-techniques",
        "prettyname":"tools-and-techniques"
    }, {
        "id":15,
        "label":"Transcripts",
        "prettyname":"transcripts"
    }]

    res.send(list)
})

router.get('/:id', (req, res) => {
    const post = {
        "id":1,
        "label":"All",
        "prettyname":"all"
    }

    res.send(post)
})


module.exports = router