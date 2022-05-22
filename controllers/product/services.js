const product = require('../../models/product');

const createProduct = (req, res)  => {
    
    product.newProduct(req.body.product_name);

}

module.exports = {
    createProduct
}