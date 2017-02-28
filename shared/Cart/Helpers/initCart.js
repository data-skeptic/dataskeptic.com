import { take } from './localStorage';

export const initCart = (state) => {
    const cartItems = take();
    state.cart.cart_items = cartItems;

    console.log('load', cartItems);
    return state
};

export default initCart;