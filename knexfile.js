// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      "postgres://postgres:root@127.0.0.1:5432/insight",
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
      "postgres://postgres:root@127.0.0.1:5432/test",
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

  staging: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      "postgres://postgres:root@127.0.0.1:5432/test",
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

  production: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      "postgres://postgres:root@127.0.0.1:5432/test",
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
  }
};
