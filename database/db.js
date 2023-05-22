const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('UserDB', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT
});

module.exports = sequelize;