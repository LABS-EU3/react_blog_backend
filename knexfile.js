// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: "postgres://rfyvlyaf:pg7zAAj1X0EeV4a_yvryaggnaT6V1qhu@rajje.db.elephantsql.com:5432/rfyvlyaf",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
