const User = require('../../models/user');
const bcrypt = require('bcrypt');
const knex = require('../../common/db');
const { Store } = require('../../models/store');
const { Product } = require('../../models/product');

function createUser(req, res){
    const user = new User(null, req.body.name, req.body.email, req.body.role, null);

    user.password = bcrypt.hashSync(req.body.password, process.env.SALT || 10);

    User.save(user)
    .then(user => {
        console.log(user);
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

function getUser(req, res){
    const { id } = req.params;
    console.log("🚀 ~ file: services.js ~ line 22 ~ getUser ~ id", id)

    User.getById(id)
    .then(user => {
        if(user){
            console.log("🚀 ~ file: services.js ~ line 27 ~ getUser ~ user", user)
            res.status(200).json(user);
        }
        else{
            res.status(404).end();
        }
        
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

function getAllUsers(req, res){
    User.getAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).end();
    });
}

function updateUser(req, res){
    const { id } = req.params;
    
    User.getById(id)
    .then(user => {
        if(!user){
            res.status(404).end();
        }
        else{
            if(req.body.email) user.email = req.body.email;
            if(req.body.role) user.role = req.body.role;
            if(req.body.name) user.name = req.body.name;
            if(req.body.password) user.password = bcrypt.hashSync(req.body.password, process.env.SALT || 10);
            User.update(user)
            .then(result => {
                res.status(200).json(user);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

function deleteUser(req, res){
    const { id } = req.params;
    
    User.getById(id)
    .then(user => {
        if(!user){
            return res.status(404).end();
        }
        else{
            knex.transaction(trx => {
                return Store.getByOwner(id)
                .then(stores => {
                    const storeIds = stores.map(store => store.id);
                    user.stores = storeIds;
                    return Product.deleteByStoreId(storeIds, trx);
                })
                .then(pdel => {
                    console.log("🚀 ~ file: services.js ~ line 96 ~ deleteUser ~ pdel", pdel)
                    return Store.deleteById(user.stores, trx);
                })
                .then(sdel => {
                    console.log("🚀 ~ file: services.js ~ line 100 ~ deleteUser ~ sdel", sdel)
                    return User.deleteById(id, trx)
                })
                .then(result => {
                    return result;
                });
            })
            .then(res2 => {
                console.log(res2);
                res.status(200).json(res2);
            })
            .catch(error => {
                console.log("🚀 ~ file: services.js ~ line 112 ~ deleteUser ~ error", error)
                res.status(500).end();
            });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

module.exports ={
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
}