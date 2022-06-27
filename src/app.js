const express = require('express');
//const productrt = require('./controllers/product/router');
const storert = require('./controllers/store/router');
const userrt = require('./controllers/user/router');
const authrt = require('./controllers/auth/router');
const productrt = require('./controllers/product/router');

const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.use('/user', userrt);
app.use('/auth', authrt);
app.use('/store', storert);
app.use('/product', productrt);

module.exports = app;