const knex = require('knex').knex({
    client: process.env.DBCLIENT,
    connection: {
      host : process.env.DBHOST,
      port : parseInt(process.env.DBPORT),
      user : process.env.DBUSER,
      password : process.env.DBPASSWORD,
      database : process.env.DBNAME
    }
});

module.exports = knex;

