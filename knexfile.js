const path = require('path');
const env = process.env.NODE_ENV;

if (env) {
  require('dotenv').config({ path: path.join(__dirname, '.' + env + '.env') });
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: process.env.DBCLIENT,
    connection: {
      host: process.env.DBHOST,
      port: parseInt(process.env.DBPORT),
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      connectTimeout: 50000
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db'
    },
    seeds: {
      directory: './db'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/StoreAPI'
    },
    useNullAsDefault: true,
    pool: { 
      min: 1, 
      max: 3, 
      idleTimeoutMillis: 360000*1000 
    },
    migrations: {
      directory: './db'
    },
    seeds: {
      directory: './db'
    }
  },

  production : {
    client: process.env.DBCLIENT,
    connection: {
      host: process.env.DBHOST,
      port: parseInt(process.env.DBPORT),
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db'
    },
    seeds: {
      directory: './db'
    }
  }
};
