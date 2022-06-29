const express = require('express');
const service = require('./service');
const authMidl = require('../../middleware/authenticated');
const storeMidl = require('../../middleware/store');

const router = express.Router();
router.use(authMidl.checkAuth);

router.post('/', service.createStore);
router.get('/:id', [storeMidl.storeBelongsTo], service.getStore); 
router.get('/', service.getStores);
router.put('/:id',  [storeMidl.storeBelongsTo], service.updateStore); 
router.delete('/:id', [storeMidl.storeBelongsTo], service.deleteStore);


module.exports = router;