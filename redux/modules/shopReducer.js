const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const initialState = {
    loading: false,
    error: false,
    products: null,
    cart: []
}

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                products: action.payload.productsList
            }
        case ADD_TO_CART:

            const isInside = state.cart.find((item) => item.id === action.payload.id);
            const cart = state.cart.filter((item) => item.id !== action.payload.id);
            const {quantity} = action.payload
            return{
                ...state,
                cart:!isInside ? [...cart, action.payload] : [...cart,{...action.payload,quantity:quantity+1}]
            }
        default:
            return state
    }
}

export const loadProducts = productsList => ({
    type: LOAD_PRODUCTS,
    payload: {
        productsList
    }
})

export const addToCart = item => ({
    type: ADD_TO_CART,
    payload: {
        ...item,
        quantity: 1
    }

})
export const getProducts = state => state.shop && state.shop.products