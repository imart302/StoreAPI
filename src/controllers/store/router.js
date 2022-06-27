const express = require('express');
const service = require('./service');
const authMidl = require('../../middleware/authenticated');

const router = express.Router();
router.use(authMidl.checkAuth);

router.post('/', service.createStore);
router.get('/:id', service.getStore); //belongs to middleware
router.get('/', service.getStores);
router.put('/:id', service.updateStore); 
router.delete('/:id', service.deleteStore);


module.exports = router;