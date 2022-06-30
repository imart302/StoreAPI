//const store = require('../../models/store');

const { Product } = require("../../models/product");
const { Store } = require("../../models/store");
const knex = require('../../common/db');

const getStore = (req, res) => {
    const storeID = req.params.id
    
    Store.getById(storeID)
    .then(str => {
        if(str)
            res.status(200).json(str);
        else
            res.status(404).end();
    })
    .catch(error => {
        res.status(404).json(error);
    });
}

const getStores = (req, res) => {
    const owner = req.user.id;

    Store.getByOwner(owner)
    .then(stores => {
        res.status(200).json(stores);
    })
    .catch(error => {   
        res.status(500).json(error);
    });
}

const createStore = (req, res) => {

    let store = new Store(null, req.body.name, req.body.address, req.user.id);

    Store.save(store)
    .then(samestore => {
        res.status(200).json(samestore);
    })
    .catch(error => {
        console.log(error);
        res.status(500).end();
    });
}

const deleteStore = (req, res) => {
    const id = req.params.id;
    Store.getById(id)
    .then(store => {
        if(store){
            knex.transaction(t => {
                return Product.deleteByStoreId(id, t)
                .then( pdels => {
                    return Store.deleteById(id, t)
                });
            })
            .then(result => {
                console.log("🚀 ~ file: service.js ~ line 60 ~ deleteStore ~ result", result)
                res.status(200).json(store);
            })
            .catch(error => {
                console.log("🚀 ~ file: service.js ~ line 63 ~ deleteStore ~ error", error)
                res.status(500).end();
            });
        }
        else{
            res.status(404).end();
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

const updateStore = (req, res) => {
    const id = req.params.id;
    
    Store.getById(id)
    .then(store => {
        if(store){
            if(req.body.name) store.name = req.body.name;
            if(req.body.address) store.address = req.body.address;
            Store.update(store)
            .then(result => {
                console.log("🚀 ~ file: service.js ~ line 87 ~ updateStore ~ result", result)
                res.status(200).json(store);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        }
    })
    .catch(error => {
        res.status(500).end();
    });
}


module.exports = {
    createStore,
    getStore,
    getStores,
    updateStore,
    deleteStore
};