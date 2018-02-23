import axios from "axios"
const express = require("express")

const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
const c = require("../../../config/config.json")
const base_url = c[env]["base_api"] + env

module.exports = cache => {
	const router = express.Router()

	router.post("/search/result", function(req, res) {
		const {q} = req.body
		const user_agent = req.get('User-Agent');

		const data = {
			q,
			user_agent,
			...req.session.ipInfo
		}

		console.log(`${base_url}/tracking/search/result`)
		console.dir(data)

		axios
			.post(`${base_url}/tracking/search/result`, data)
			.then(result => res.send(result.data))
			.catch(err => res.send(err))
	})

	return router
}
