const User = require('../../models/user');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

function getToken(req, res){
    const { email, password } = req.body;
    User.getByEmail(email)
    .then(user => {
        if(user){
            let valid = bcrypt.compareSync(password, user.password);
            if(valid){
    
                const token = JWT.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                process.env.JWTSECRET || "TestSecret123", 
                {
                    expiresIn: '12h'
                }
                );
                res.status(200).json({token});
            }
            else{
                res.status(401).json({message: 'Incorrect mail or password'});
            }
        }
        else{
            res.status(404).end();
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

module.exports ={
    getToken
}