import Launcher from './Containers/Launcher'
export default Launcher

export * from './constants'
export * as actions from '../shared/actions'

export { default as reducer } from './reducer'
export { default as middleware } from './middleware'
export { default as reduxChatBot } from './hoc/reduxChatBot'
