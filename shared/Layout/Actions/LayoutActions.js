export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU'
export const TOGGLE_SCROLL_LOCK = 'TOGGLE_SCROLL_LOCK'

export const TOGGLE_SEARCH_AREA = 'TOGGLE_SEARCH_AREA'

export const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE'

/**
 * Change site mobile menu visibility
 *
 */
export function toggleMobileMenu() {
  return {
    type: TOGGLE_MOBILE_MENU
  }
}

/**
 * Hide/Unhide search area
 *
 */
export function toggleSearchArea() {
  return {
    type: TOGGLE_SEARCH_AREA
  }
}

/**
 * Change title
 */
export function changePageTitle(title) {
  return {
    type: CHANGE_PAGE_TITLE,
    payload: {
      title
    }
  }
}
