const JWT = require('jsonwebtoken');
const User = require('../models/user');

function checkAuth(req, res, next){
    const bearerToken = req.headers['authorization'];
    
    if(bearerToken){
        const jwtstring = bearerToken.split(' ')[1];
        JWT.verify(jwtstring, process.env.JWTSECRET || "TestSecret123", (error, decoded) => {
            if(error){
                res.status(401).json(error);
            }
            else{
                req.user = new User(decoded.id, decoded.name, decoded.email, decoded.role);
                next();
            }
        });
    }
    else{
        return res.status(401).json({message: "Token required"});
    }
}


module.exports = {
    checkAuth
}