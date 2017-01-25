module.exports = {
    get_products: function(req, res, products_list) {
        var url = req.url
        var typ = url.split('/')[3]
        var products = []
        for (var i in products_list) {
            var product = products_list[i]
            if (product['type'] == typ) {
                products.push(product)
            }
        }
        return res.status(200).end(JSON.stringify(products))
    }
}
