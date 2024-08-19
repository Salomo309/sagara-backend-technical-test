'use strict';

const config = require('../config/config.js');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password, {
      host: config.development.host,
      dialect: config.development.dialect,
      logging: false,
  }
)

sequelize.authenticate()
.then(() => {
    // console.log('connected..')
})
.catch(err => {
    // console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Clothes = require('./Clothes.js')(sequelize, DataTypes)

db.sequelize.sync({ alter: true })
.then(() => {
    // console.log('yes re-sync done!')
})

module.exports = db;
