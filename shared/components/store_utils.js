	export function calculateShipping(items, short) {
		var has_items = 0
		var big_items = 0
		var is_us = 1
		if (short != "us") {
			is_us = 0
		}
		for (var i=0; i < items.length; i++) {
			var item = items[i]
			if (item.product.type != "membership") {
				has_items = 1
			}
			if (item.product.type != "membership" && item.product.price > 4) {
				big_items = 1
			}
		}
		var shipping = 0
		if (has_items == 1) {
			if (big_items == 1) {
				if (is_us == 1) {
					shipping = 4
				} else {
					shipping = 6
				}
			} else {
				if (is_us == 1) {
					shipping = 1
				} else {
					shipping = 2
				}
			}
		}
		return shipping
	}
	export function calculateTotal(products, country) {
		var shipping = calculateShipping(products, country)
		var total = shipping
		for (var i=0; i < products.length; i++) {
			var item = products[i]
			total += item.product.price * item.quan
		}
		return total
	}

