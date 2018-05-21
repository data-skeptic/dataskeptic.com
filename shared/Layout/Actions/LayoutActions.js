export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU'

export const TOGGLE_SEARCH_AREA = 'TOGGLE_SEARCH_AREA'

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
