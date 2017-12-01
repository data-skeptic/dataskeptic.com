import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    const list = [{
        "id":1,
        "name": "Briliant",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"


    }, {
        "id":2,
        "name": "Briliant2",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":3,
        "name": "Briliant3",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":4,
        "name": "Briliant4",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":5,
        "name": "Briliant5",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":6,
        "name": "Briliant6",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":7,
        "name": "Briliant7",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":8,
        "name": "Briliant8",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":9,
        "name": "Briliant9",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":10,
        "name": "Briliant10",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":11,
        "name": "Briliant11",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":12,
        "name": "Briliant12",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":13,
        "name": "Briliant13",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":14,
        "name": "Briliant14",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }, {
        "id":15,
        "name": "Briliant15",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }]

    res.send(list)
})

router.get('/:id', (req, res) => {
    const post = {
        "id":15,
        "name": "Briliant15",
        "url": "http://brilliant.org/dataskeptics",
        "promoText":"some text",
        "img":"/image.jpg",
        "date": "June 12, 2017"
    }

    res.send(post)
})


module.exports = router