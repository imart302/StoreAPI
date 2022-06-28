const env = process.env.NODE_ENV;
console.log("🚀 ~ file: db.js ~ line 2 ~ env", env)

const config = require('../../knexfile')[env];
console.log("🚀 ~ file: db.js ~ line 5 ~ config", config)

const knex = require('knex').knex(config);

// const knex = require('knex').knex({
//   client: process.env.DBCLIENT,
//   connection: {
//     host : process.env.DBHOST,
//     port : parseInt(process.env.DBPORT),
//     user : process.env.DBUSER,
//     password : process.env.DBPASSWORD,
//     database : process.env.DBNAME
//   }
// });

module.exports = knex;

