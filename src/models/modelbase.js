const knex = require('../common/db');

class ModelBase {

    static tableName = 'base';

    static getFields(){
        return [];
    }

    static builder(params){
        return new ModelBase();
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
                .select(... this.getFields())
                .where({id})
            .then(rows => {
                if(rows.length > 0){
                    resolve(this.builder(rows[0]));
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
}


module.exports = {
    ModelBase
}