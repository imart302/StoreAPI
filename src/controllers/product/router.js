const service = require('./services');
const express = require('express');
const authMidl = require('../../middleware/authenticated');
const productMidl = require('../../middleware/product');

const router = express.Router();
router.use(authMidl.checkAuth);

router.post('/', [productMidl.checkNewProductFields, productMidl.storeBelongsTo], service.createProduct);
router.get('/store/:storeId', [productMidl.storeBelongsToParam], service.getProducts);
router.get('/:id', service.getProduct);
router.get('/', service.getAllProducts);
router.put('/:id', [productMidl.checkUpdateProductFields], service.updateProduct);
router.delete('/:id', service.deleteProduct);

module.exports = router;
