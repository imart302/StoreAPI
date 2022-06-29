const { Store } = require("../models/store");


function storeBelongsTo(req, res, next){
    const { id } = req.params;

    Store.getById(id)
    .then(store => {
        if(store){
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