const initialState = {
    loading: false,
    error: false,
    products: null,
    cart: null
}

export default function reducer(state = initialState,
                                action = {}) {
    switch (action.type) {
        default:
            return state
    }
}