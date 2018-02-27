import axios from "axios"
import { read, exists, write } from "../storage"
const formatKey = (job_id, action) => `${job_id}_${action}`

export const getImpressionId = job_id => {
  const key = formatKey(job_id, "impression")
  return read(key)
}

export const impression = async job_id => {
  const key = formatKey(job_id, "impression")

  const { impression_id } = await axios
    .post("/api/v1/track/jobs/impression", { job_id })
    .then(res => res.data)

  write(key, impression_id)
  return impression_id
}

export const click = (job_id, impression_id) => {
  const key = formatKey(job_id, "click")

  axios
    .post("/api/v1/track/jobs/click", { job_id, impression_id })
    .then(res => res.data)

  write(key, 1)
}
