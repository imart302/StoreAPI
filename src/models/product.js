const knex = require('../common/db');


class Product {
    
    static tableName = 'products';
    static fId = 'id';
    static fName = 'name';
    static fPrice = 'price';
    static fStoreId = 'storeId';

    constructor (id=null, name=null, price=null, storeId=null){
        this.id = id;
        this.name = name;
        this.price = price;
        this.storeId = storeId;
    }

    static getFields() {
        return [
            this.fId,
            this.fName,
            this.fPrice,
            this.fStoreId
        ];
    }

    static save(product, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
            .insert({...product})
            .then(result => {
                product.id = result[0];
                resolve(product);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static getByStoreId(storeId, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName)) 
                .select(this.fId, this.fName, this.fPrice, this.fStoreId)
                .where({storeId})
            .then(rows => {
                const products = rows.map( row => {
                    return new Product(row.id, row.name, row.price, row.storeId);
                });
                resolve(products);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static getById(id, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(this.fId, this.fName, this.fPrice, this.fStoreId)
                .where({id})
            .then(rows => {
                if(rows.length > 0){
                    resolve(new Product(rows[0].id, rows[0].name, rows[0].price, rows[0].storeId));
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

    static getBy(field, values, trx = null){
        if(!Array.isArray(values)){
            values = [ values ];
        }
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(... this.getFields())
                .whereIn(field, values)
            .then(rows => {
                const products = rows.map( row => new Product(row.id, row.name, row.price, row.storeId));
                resolve(products);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static update(product, trx = null){
        let upd = {
            name: product.name,
            price: product.price,
            storeId: product.storeId
        }
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .update(upd)
                .where({id: product.id})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static deleteById(id, trx=null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .delete()
                .where({id})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static deleteByStoreId(storeId, trx = null){

        if(!Array.isArray(storeId)){
            storeId = [ storeId ]; 
        }
        
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .delete()
                .whereIn(this.fStoreId, storeId)
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
    Product
}



