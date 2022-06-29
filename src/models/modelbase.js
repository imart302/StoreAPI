const knex = require('../common/db');

class ModelBase {

    static tableName = 'base';

    static getFields(){
        return [];
    }

    static save(instance, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
            .insert({... instance})
            .then(result => {
                product.id = result[0];
                resolve(product);
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

    static getByIds(ids, trx = null ){
        
    }

    static getBy(field, values, trx = null){

    }

    static getWhere(values, trx = null){

    }

}


module.exports = {
    ModelBase
}