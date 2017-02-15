export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU'
export const TOGGLE_SCROLL_LOCK = 'TOGGLE_SCROLL_LOCK'

/**
 * Change site mobile menu visibility
 *
 */
export function toggleMobileMenu() {
    return {
        type: TOGGLE_MOBILE_MENU
    }
}