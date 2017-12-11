const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const initialState = {
    loading: false,
    error: false,
    products: null,
    cart: null
}

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return{
                ...state,
                products:action.payload.productsList
            }
        default:
            return state
    }
}

export const loadProducts = productsList =>({
    type:LOAD_PRODUCTS,
    payload:{
        productsList
    }
})
export const getProducts = state => state.shop && state.shop.products