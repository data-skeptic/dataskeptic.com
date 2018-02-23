import axios from "axios"

export const track = () => {
  axios.post("/api/v1/track/search/result", { }).then(res => res.data)
}
