const knex = require('../common/db');
const { Product } = require('./product');

class Store {

    static tableName = "stores";
    static fId = "id";
    static fName = "name";
    static fAddress = "address";
    static fOwner = "owner";

    constructor (id = null, name = null, address = null, ownerId){
        this.id = id;
        this.name = name;
        this.address = address;
        this.owner = ownerId;
    }

    static save(store, trx = null){
        return new Promise( (resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .insert({...store})
            .then(results => {
                if(results.length > 0){
                    store.id = results[0];
                    resolve(store);
                }
                else{
                    resolve(null);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static deleteById(storeId, deleteAsociated=true, trx=null){

        if(!Array.isArray(storeId)){
            storeId = [ storeId ];          
        }
        return new Promise ( (resolve, reject) => {

            (() => {
                if(deleteAsociated) return Product.deleteByStoreId(storeId, trx);
                else return new Promise((resolve) => {resolve(false)});
            })()
            .then(resultP => {
                return (trx ? trx(this.tableName) : knex(this.tableName))
                    .delete()
                    .whereIn('id', storeId)
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.log("🚀 ~ file: store.js ~ line 60 ~ Store ~ returnnewPromise ~ error", error);
                reject(error);
            });
            
        });
    }

    static getBy(field, values, trx=null){
        if(!Array.isArray(values)){
            values = [ parseInt(values) ];  
        }
        return new Promise ( (resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(this.fId, this.fName, this.fAddress, this.fOwner)
                .whereIn(field, values)
            .then(rows => {
                const stores = rows.map(row => new Store(row.id, row.name, row.address, row.owner));
                resolve(stores);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static deleteByOwner(owner, deleteAsociated=true, trx=null){
        return new Promise((resolve, reject) => {
            (() => {
                if(deleteAsociated){
                    return this.getBy(this.fOwner, owner)
                        .then(stores => {
                            const storeIds = stores.map(store => store.id);
                            return Product.deleteByStoreId(storeIds, trx)
                        });
                } 
                else return new Promise((resolve) => resolve(true));
            })()
            .then(respP => {
                return (trx ? trx(this.tableName) : knex(this.tableName))
                    .delete()
                    .where({ owner })
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static getByOwner(owner, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(this.fId, this.fName, this.fAddress, this.fOwner)
                .where({owner})
            .then(rows => {
                const stores = rows.map(row => {
                    return new Store(row.id, row.name, row.address, row.owner);
                });
                resolve(stores);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    
    static getById(storeId, trx = null){
        return new Promise ( (resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(this.fId, this.fName, this.fAddress, this.fOwner)
                .where({id: storeId})
            .then(rows => {
                if(rows.length > 0){
                    resolve(new Store(rows[0].id, rows[0].name, rows[0].address, rows[0].owner));
                }
                else{
                    resolve(null);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static update(store, trx = null){
        return new Promise( (resolve, reject) => {
            let upd ={
                name: store.name,
                address: store.address
            }
            (trx ? trx(this.tableName) : knex(this.tableName))
                .update(upd)
                .where({id: store.id})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

module.exports = {
    Store
}