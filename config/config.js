'use strict';

if (process.env.DB_HOST == undefined) {
  const dotenv = require('dotenv');
  dotenv.config();
}

console.log(process.env.DB_HOST);
let config = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "port": process.env.DB_PORT
  }
};

module.exports = config;
