import { take } from './localStorage'

export const initCart = state => {
  const data = take()

  const {
    cart_items = [],
    country_short = 'us',
    country_long = 'United States of America'
  } = data

  state.cart_items = cart_items
  state.country_short = country_short
  state.country_long = country_long

  return state
}

export default initCart
