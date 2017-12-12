const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'

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
        case ADD_TO_CART: {
            const {id} = action.payload
            const existingItem = state.cart.find(item => item.id === id);
            const cart = state.cart.filter((item) => item.id !== id);
            return {
                ...state,
                cart: !existingItem ? [...cart, action.payload] : [...cart, {
                    ...action.payload,
                    quantity: existingItem.quantity + 1
                }]
            }
        }
        case CHANGE_QUANTITY: {
            const {id, quantity} = action.payload
            return {
                ...state,
                cart: state.cart.map(item => {
                    if (item.id === id) {
                        return ({
                            ...item,
                            quantity: quantity
                        })
                    }
                    else {
                        return ({
                            ...item
                        })
                    }
                })
            }
        }
        case REMOVE_ITEM:{
            const {id} = action.payload
            const cart = state.cart.filter(item => item.id !== id);
            return{
                ...state,
                cart:[...cart]
            }
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
export const changeQuantity = (id, quantity) => ({
    type: CHANGE_QUANTITY,
    payload: {
        id,
        quantity
    }
})

export const removeItem = id =>({
    type:REMOVE_ITEM,
    payload:{
        id
    }
})


export const getProducts = state => state.shop && state.shop.products

export const getCartAmount = state => state.shop && state.shop.cart && state.shop.cart.reduce((prev, curr) => (curr.quantity && (prev + curr.quantity)), 0)

export const getCart = state => state.shop && state.shop.cart

export const getSubTotal = state => state.shop && state.shop.cart.map(item => item.price * item.quantity).reduce((prev, curr) => (curr && (prev + curr)), 0)