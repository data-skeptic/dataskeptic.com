/**
 * Calculate cart items count
 *
 * @param {Object} items Cart items list
 * @return {Number}
 */
export function getItemsCount(items) {
    items = items || []

    return items.reduce((mem, item) => {
        mem += item.quantity
    }, 0);
}