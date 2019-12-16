// Update with your config settings.
require("dotenv").config({ path: "./env" });
module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      "postgres://rfyvlyaf:pg7zAAj1X0EeV4a_yvryaggnaT6V1qhu@rajje.db.elephantsql.com:5432/rfyvlyaf",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "db_migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      "postgres://rfyvlyaf:pg7zAAj1X0EeV4a_yvryaggnaT6V1qhu@rajje.db.elephantsql.com:5432/rfyvlyaf",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
