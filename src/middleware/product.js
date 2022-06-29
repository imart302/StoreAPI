const joi = require('joi');
const { Product } = require('../models/product');
const { Store } = require('../models/store');

const newProductBody = joi.object({
    name: joi.string().min(1).required(),
    price: joi.number().min(0).required(),
    storeId: joi.number().integer().min(1)
});

const updateProductBody = joi.object({
    name: joi.string().min(1),
    price: joi.number().min(0)
});

function checkNewProductFields(req, res, next){
    const { error, value } = newProductBody.validate(req.body);
    if(error){
        return res.status(400).json(error);
    }
    else{
        return next();
    }
}

function checkUpdateProductFields(req, res, next) {
    const { error, value } = updateProductBody.validate(req.body);
    if (error) {
        return req.status(400).json(error);
    }
    else {
        return next();
    }
}

function storeExists(req, res, next){
    Store.getById(req.body.storeId)
    .then(store => {
        if(store){
            next();
        }
        else{
            res.status(404).json({message: 'Unexisting store'});
        }
    })
    .catch(error => {
        res.status(500).end();
    });
}

function storeBelongsTo(req, res, next){
    Store.getByOwner(req.user.id)
    .then(userStores => {
        console.log("🚀 ~ file: product.js ~ line 53 ~ storeBelongsTo ~ userStores", userStores)
        
        const storeIds = userStores.map(store => store.id);
        if(!storeIds.includes(req.body.storeId)){
            res.status(403).end();
        }
        else{
            next();
        }
    })
    .catch(error => {
        res.status(500).end();
    });
}

function storeBelongsToParam(req, res, next){
    Store.getByOwner(req.user.id)
    .then(userStores => {
        const storeIds = userStores.map(store => store.id);
        if(! (storeIds.includes(parseInt(req.params.storeId)))){
            console.log('here');
            res.status(403).end();
        }
        else{
            next();
        }
    })
    .catch(error => {
        res.status(500).end();
    });
}


function productBelongsTo(req, res, next){
    Product.getByOwner(req.user.id)
    .then(products => {
        const productsIds = products.map(product => product.id);
        const check = productsIds.includes(parseInt(req.params.id))
        if(check){
            
        }
    })
    .catch(error => {

    });
}


module.exports = {
    checkNewProductFields,
    checkUpdateProductFields,
    storeExists,
    storeBelongsTo,
    storeBelongsToParam
}
