import express from 'express'

const router = express.Router()

export default function (cache) {

    router.get('/orders', (req, res) =>
        res.send({
            ok: true
        })
    )


    return router
}