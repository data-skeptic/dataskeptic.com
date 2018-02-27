import axios from "axios"

export const track = (q) => {
  axios.post("/api/v1/track/search/result", {q}).then(res => res.data)
}
