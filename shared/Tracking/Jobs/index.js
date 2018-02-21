import axios from "axios"

const formatKey = (job_id, action) => `${job_id}_${action}`

export const getImpressionId = (job_id) => {
	const key = formatKey(job_id, 'impression')
	return JSON.parse(localStorage.getItem(key))
}

export const impression = async (job_id) => {
	const key = formatKey(job_id, 'impression')
	if (localStorage.getItem(key)) return
	const {impression_id} = await axios.post('/api/v1/track/jobs/impression', { job_id }).then((res) => res.data)
	localStorage.setItem(key, JSON.stringify(impression_id))
	return impression_id
}

export const click = (job_id, impression_id) => {
	const key = formatKey(job_id, 'click')
	if (localStorage.getItem(key)) return
	axios.post('/api/v1/track/jobs/click', { job_id, impression_id }).then((res) => res.data)
	localStorage.setItem(key, '1')
}