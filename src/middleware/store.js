const { Store } = require("../models/store");


function storeBelongsTo(req, res, next){
    const { id } = req.params;

    console.log("🚀 ~ file: store.js ~ line 7 ~ storeBelongsTo ~ req.user", req.user)
    
    Store.getById(id)
    .then(store => {
        if(store){
            console.log("🚀 ~ file: store.js ~ line 12 ~ storeBelongsTo ~ store", store)
            if(store.owner == req.user.id){
                next();
            }
            else{
                res.status(403).json({message: 'Resource not allowed'});
            }
        }
        else{
            res.status(404).end();
        }
    })
    .catch(error => {
        return res.status(500).end();
    })
}



module.exports = {
    storeBelongsTo
}