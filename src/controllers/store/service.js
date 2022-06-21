const store = require('../../models/store');


const getStore = (req, res) => {
    const storeID = req.params.id
    if(storeID){
        store.getStore(storeID)
        .then(store => {
            res.status(200).json(store);
        })
        .catch(error => {
            res.status(404).json(error);
        });
    }
    else{
        store.getAllStores()
        .then(stores => {
            res.status(200).json(stores);
        })
        .catch(error => {
            res.status(404).json(error);
        });
    }
}

const createNewStore = (req, res) => {
    const {storeName, address} = req.body;
    console.log(storeName, address);
    
    store.createStore(storeName, address)
    .then(result => {
        res.status(201).json({
            message: "Created"
        });
    })
    .catch( error => {
        res.status(500).json({
            message: "Thre was a problem"
        });
    });
}

const deleteStore = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).end();
    }
    else{
        store.removeStore(id)
        .then( result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    }
};



const updateStore = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).end();
    }
    else{
        store.updateStore(id, req.body.name, req.body.address)
        .then(data => {
            res.status(204).end();
        })
        .catch(error => {
            res.status(500).end();
        });
    }
}

const getStoreProducts = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).end();
    }
    else{
        
    }
}

const supplyProduct = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).end();
    }
    else{
        
    }
}

module.exports = {createNewStore, getStore, deleteStore, updateStore};