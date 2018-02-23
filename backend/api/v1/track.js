import axios from "axios"
const express = require("express")

const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
const c = require("../../../config/config.json")
const base_url = c[env]["base_api"] + env

module.exports = cache => {
	const router = express.Router()

	router.post("/search/result", function(req, res) {
		const user_agent = req.get('User-Agent');

		const data = {
			user_agent,
			...req.session.ipInfo
		}

		axios
			.post(`${base_url}/tracking/search/result`, data)
			.then(result => res.send(result.data))
			.catch(err => res.send(err))
	})

	return router
}
