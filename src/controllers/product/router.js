const service = require('./services');
const express = require('express');
const authMidl = require('../../middleware/authenticated');

const router = express.Router();
router.use(authMidl.checkAuth);

router.post('/', service.createProduct);
router.get('/store/:storeId', service.getProducts);
router.get('/:id', service.getProduct);
router.get('/', service.getAllProducts);
router.put('/:id', service.updateProduct);
router.delete('/:id', service.deleteProduct);

module.exports = router;
