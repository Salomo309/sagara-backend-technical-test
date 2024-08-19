const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: '',
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: '',
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production : {
    username: process.env.DB_USERNAME,
    password: '',
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },

}
