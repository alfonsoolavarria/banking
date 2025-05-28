// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'debug', 'debug', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
