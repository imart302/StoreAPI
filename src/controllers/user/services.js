const User = require('../../models/user');
const bcrypt = require('bcrypt');
const knex = require('../../common/db');

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

    User.getById(id)
    .then(user => {
        if(user){
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
            res.status(404).end();
        }
        else{
            knex.transaction(trx => {
                User.deleteById(id, true, trx)
                .then(result => {
                    trx.commit();
                    console.log(result);
                    res.status(200).json(user);
                })
                .catch(error => {
                    trx.rollback();
                    res.status(500).json(error);
                });
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
    deleteUser
}