const knex = require('../common/db');
const { ModelBase } = require('./modelbase');


class User extends ModelBase {
    static tableName = "users";
    static fId = "id";
    static fName = "name";
    static fEmail = "email";
    static fPassword = "password";
    static fRole = "role";

    constructor(id = null, name = null, email = null, role='USER', password = null){
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password
    }

    static getFields(){
        return [
            this.fId,
            this.fName,
            this.fEmail,
            this.fPassword,
            this.fRole
        ]
    }

    static builder(params){
        return new User(params.id, params.name, params.email, params.role, params.password);
    }

    // static save(user, trx = null){
    //     return new Promise((resolve, reject) => {
    //         (trx ? trx(this.tableName) : knex(this.tableName))
    //             .insert({...user})
    //             .into(this.tableName)
    //         .then(result => {
    //             if(result.length > 0){
    //                 user.id = result[0];
    //             }
    //             resolve(user);
    //         })
    //         .catch(error => {
    //             reject(error);
    //         });
    //     });
    // }

    // static getById(id){
    //     return new Promise((resolve, reject) => {
    //         knex
    //             .select(... this.getFields())
    //             .from(this.tableName)
    //             .where(this.fId, id)
    //         .then(users => {
    //             if(users.length > 0){
    //                 resolve(new User(users[0].id, users[0].name, users[0].email, users[0].role, users[0].password));
    //             }
    //             else{
    //                 resolve(null);
    //             }
    //         })
    //         .catch(error => {
    //             console.log("🚀 ~ file: user.js ~ line 64 ~ User ~ returnnewPromise ~ error", error)
    //             reject(error);
    //         });
    //     });
    // }


    // static getAll(trx = null){
    //     return new Promise((resolve, reject) => {
    //         (trx ? trx(this.tableName) : knex(this.tableName))
    //             .select(... this.getFields())
    //         .then(rows => {
    //             const users = rows.map(row => new User(row.id, row.name, row.email, row.role, row.password));
    //             resolve(users);
    //         })
    //         .catch(error => {
    //             reject(error);
    //         });
    //     });
    // }

    static getByEmail(email){
        return new Promise((resolve, reject) => {
            knex(this.tableName)
                .select(... this.getFields())
                .where({email})
            .then(rows => {
                if(rows.length > 0){
                    resolve(new User(rows[0].id, rows[0].name, rows[0].email, rows[0].role, rows[0].password));
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

    // static deleteById(id, trx = null){
    //     console.log('delete user model');
    //     return new Promise((resolve, reject) => {
    //         (trx ? trx(this.tableName) : knex(this.tableName))
    //                 .where({ id })
    //                 .delete()
    //         .then(result => {
    //             resolve(result);
    //         })
    //         .catch(error => {
    //             reject(error);
    //         });
    //     });
    // }

    // static update(user){
    //     return new Promise((resolve, reject) => {
    //         console.log(user);
    //         const u = {...user};
    //         const {id, ...upd} = u;
    //         console.log(upd);
    //         knex(this.tableName)
    //             .where({id: user.id})
    //             .update(
    //                 upd
    //             )
    //         .then(result => {
    //             resolve(result);
    //         })
    //         .catch(error => {
    //             reject(error);
    //         })
    //     });
    // }

    // static getBy(field, value, trx = null){
    //     return new Promise((resolve, reject) => {
    //         (trx ? trx(this.tableName) : knex(this.tableName))
    //             .select(... this.getFields())
    //             .whereIn(field, value)
    //         .then(rows => {
    //             const users = rows.map (row => new User(row.id, row.name, row.email, row.role, row.password) )
    //             resolve(users);
    //         })
    //         .catch(error => {
    //             reject(error);
    //         });
    //     });
    // }
}

module.exports = User;


