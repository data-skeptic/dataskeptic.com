import { put } from './localStorage'

export const persistCart = state => {
  const { cart_items, country_short, country_long } = state

  const data = {
    cart_items,
    country_short,
    country_long
  }
  put(data)
}

export default persistCart
