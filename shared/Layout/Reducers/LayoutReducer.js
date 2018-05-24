import { fromJS } from 'immutable'
import {
  SHOW_ADD,
  TOGGLE_MOBILE_MENU,
  TOGGLE_SEARCH_AREA
} from '../Actions/LayoutActions'

const IS_CLIENT = (() => {
  let isDefined = false
  try {
    window
    isDefined = true
  } catch (x) {}
  return isDefined
})()

export const DEFAULT_APP_TITLE = 'Data Skeptic'

const init = {
  isMobileMenuVisible: false,
  searchAreaVisible: false,
  title: DEFAULT_APP_TITLE,
  showAds: true
}

const defaultState = fromJS(init)

export default function LayoutReducer(state = defaultState, action) {
  const { type } = action

  switch (type) {
    case TOGGLE_MOBILE_MENU:
      const nextVisible = !state.get('isMobileMenuVisible')
      state = state.setIn(['isMobileMenuVisible'], nextVisible)
      return state

    case TOGGLE_SEARCH_AREA:
      state = state.setIn(
        ['searchAreaVisible'],
        !state.get('searchAreaVisible')
      )
      return state

    case SHOW_ADD:
      state = state.set('showAds', action.payload.showAds)
      return state

    default:
      return state
  }
}
