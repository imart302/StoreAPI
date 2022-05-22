const express = require('express');
//const productrt = require('./controllers/product/router');
const storert = require('./controllers/store/router');


const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.use("/store", storert);

app.listen(9091, ()=> {
    console.log("app running");
});