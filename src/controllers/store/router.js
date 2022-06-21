const express = require('express');
const service = require('./service');

const router = express.Router();

router.get("/:id", service.getStore);
//router.get("/:id/products", service.getStoreProducts);
router.post("/", service.createNewStore);
router.delete("/:id", service.deleteStore);
router.patch("/:id", service.updateStore);
//router.patch("/:id/products", service.supplyProduct);


module.exports = router;