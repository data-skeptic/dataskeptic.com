import {getHistory} from "./reducer";

export default (state) => ({
  history: getHistory(state)
}) 
