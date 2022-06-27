const express = require('express');
const {getToken} = require('./services');

const router = express.Router();

router.post('/', getToken);

module.exports = router;
