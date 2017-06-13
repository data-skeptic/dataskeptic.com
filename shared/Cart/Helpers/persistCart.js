import { put } from './localStorage';

export const persistCart = (store) => {
    const cartItems = store.cart.cart_items;
    put(cartItems);
};

export default persistCart;