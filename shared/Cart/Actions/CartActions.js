export const RESET_INVOICE = 'RESET_INVOICE'
export const START_INVOICE_PAYMENT = 'START_INVOICE_PAYMENT'
export const INVOICE_ERROR = 'INVOICE_ERROR'
export const INVOICE_RESULT = 'INVOICE_RESULT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CHANGE_CART_QUANTITY = 'CHANGE_CART_QUANTITY'
export const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT'
export const SET_STORE_ENVIRONMENT = 'SET_STORE_ENVIRONMENT'
export const CHANGE_COUNTRY = 'CHANGE_COUNTRY'
export const TOGGLE_CART = 'TOGGLE_CART'
export const SHOW_CART = 'SHOW_CART'
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
export const DO_CHECKOUT = 'DO_CHECKOUT'
export const TOKEN_RECIEVED = 'TOKEN_RECIEVED'
export const PROCESS_CHECKOUT = 'PROCESS_CHECKOUT'

/**
 * Show cart
 */
export function showCart() {
    return {
        type: SHOW_CART
    }
}

/**
 * Toggle cart visibility
 * - show/hide cart
 */
export function toggleCart() {
    return {
        type: TOGGLE_CART
    }
}