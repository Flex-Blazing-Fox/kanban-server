require("dotenv").config();
const getConnectionConfig = require("../helpers/getConnectionConfig");
let DB_USERNAME_PROD, DB_PASSWORD_PROD, DB_DATABASE_PROD, DB_HOST_PROD, DB_PORT_PROD;
if (process.env.DATABASE_URL) {
  let prodConfig = getConnectionConfig(process.env.DATABASE_URL)
  DB_USERNAME_PROD = prodConfig[username]
  DB_PASSWORD_PROD = prodConfig[password]
  DB_DATABASE_PROD = prodConfig[database]
  DB_HOST_PROD = prodConfig[host]
  DB_PORT_PROD = prodConfig[port]
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME_PROD,
    password: DB_PASSWORD_PROD,
    database: DB_DATABASE_PROD,
    host: DB_HOST_PROD,
    port: DB_PORT_PROD,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
