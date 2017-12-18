export const updateQuantity = (id, cart,quantity) => (cart.map(item => {
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
}))
