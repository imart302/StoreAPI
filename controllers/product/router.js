const product = require('../../models/product');
const service = require('../product/');
const express = require('express');

const router = express.Router();

router.get("/", )

router.post("/", service.createProduct);

module.exports = router;
