const joi = require('joi');
const User = require('../models/user');

const newUserBodySchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    name: joi.string().min(1).required(),
    role: joi.string().required()
});

const updateUserBodySchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(4),
    name: joi.string().min(1),
    role: joi.string()
});

function checkNewUserFields(req, res, next){
    const { error, value }= newUserBodySchema.validate(req.body);
    if(error){
        res.status(400).json(error);
    }
    else{
        next();
    }
}

function checkUpdateUserFields(req, res, next){
    const { error, value } = updateUserBodySchema.validate(req.body);
    if(error){
        return res.status(400).json(error);
    }
    else{
        next();
    }
}

function existingEmail(req, res, next){
    User.getByEmail(req.body.email)
    .then(user => {
        if(user){
            return res.status(400).json({message: 'email already in use'});
        }
        else{
            next()
        }
    })
    .catch(error => {
        return res.status(500).end();
    });
}

module.exports = {
    checkNewUserFields,
    existingEmail,
    checkUpdateUserFields
}