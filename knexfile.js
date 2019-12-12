// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL || 'postgres://dbfucrpc:YskUiCOehjAEDZ-jsu0OJ454VGEPbyYF@rajje.db.elephantsql.com:5432/dbfucrpc',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL || 'postgres://dbfucrpc:YskUiCOehjAEDZ-jsu0OJ454VGEPbyYF@rajje.db.elephantsql.com:5432/dbfucrpc',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DB_URL || 'postgres://dbfucrpc:YskUiCOehjAEDZ-jsu0OJ454VGEPbyYF@rajje.db.elephantsql.com:5432/dbfucrpc',
    pool: {
      min: 2,
      mx: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL || 'postgres://dbfucrpc:YskUiCOehjAEDZ-jsu0OJ454VGEPbyYF@rajje.db.elephantsql.com:5432/dbfucrpc',
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
