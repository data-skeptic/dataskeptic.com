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
        "rendered": "opinions/2017/computational-complexity-for-data-scientists.htm",
        "c_hash": "7a3809db8d9ad151d16d486f884177aa",
        "date_discovered": "2017-11-21",
        "title": "Computational Complexity Theory for Data Scientists",
        "last_rendered": "2017-11-21",
        "author": "Kyle",
        "uri": "dataskeptic.com/opinions/2017/computational-complexity-for-data-scientists.md",
        "ext": ".md",
        "publish_date": "2017-11-22",
        "env": "master",
        "prettyname": "/opinions/2017/computational-complexity-theory-for-data-scientists",
        "desc": "As was announced a while back on the Data Skeptic podcast, the show is going to have running themes for the foreseeable future, in which we'll spend a few months talking about one topic or area.  We more or less did this earlier this year when we focused on deep learning following by a few episodes on deep learning in medical applications.  These themes will become more formal and more obvious going forw"
    }

    res.send(post)
})


module.exports = router