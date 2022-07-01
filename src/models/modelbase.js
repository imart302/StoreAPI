const knex = require('../common/db');

class ModelBase {

    //OVERRIDE TABLE NAME AND COLUMS NAME
    static tableName = 'base';
    static fId = 'id';

    //OVERRIDE THIS
    static getFields(){
        return [];
    }

    //OVERRIDE THIS
    static builder(params){
        return new ModelBase();
    }

    static save(instance, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
            .insert({... instance})
            .then(result => {
                instance.id = result[0];
                resolve(instance);
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

    static getAll(trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(... this.getFields())
            .then(rows => {
                const instances = rows.map(row => this.builder(row));
                resolve(instances);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static getByIds(ids, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(... this.getFields())
                .whereIn(this.fId, ids)
            .then(rows => {
                const instances = rows.map(row => this.builder(row));
                resolve(instances);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static getBy(field, values, trx = null){
        console.log("🚀 ~ file: modelbase.js ~ line 82 ~ ModelBase ~ getBy ~ values", values)
        console.log("🚀 ~ file: modelbase.js ~ line 82 ~ ModelBase ~ getBy ~ field", field)
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(... this.getFields())
                .whereIn(field, values)
            .then(rows => {
                const instances = rows.map(row => this.builder(row));
                resolve(instances); 
            })
            .catch(error => {
                console.log("🚀 ~ file: modelbase.js ~ line 93 ~ ModelBase ~ returnnewPromise ~ error", error)
                reject(error);
            });
        });
    }

    static getQuery(params, trx = null){
        return new Promise((resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .select(... this.getFields())
                .where(params)
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

    static deleteById(id, trx=null){

        if(!Array.isArray(id)){
            id = [ id ];          
        }
        return new Promise ( (resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .delete()
                .whereIn(this.fId, id)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
            
        });
    }

    static deleteBy(field, values, trx){
        return new Promise ( (resolve, reject) => {
            (trx ? trx(this.tableName) : knex(this.tableName))
                .delete()
                .whereIn(field, values)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static update(instance){
        return new Promise((resolve, reject) => {

            const upd = {... instance};

            knex(this.tableName)
                .where({id: instance.id})
                .update(
                    upd
                )
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

}


module.exports = {
    ModelBase
}