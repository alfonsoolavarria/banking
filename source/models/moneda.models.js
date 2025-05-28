const {DataTypes} = require('sequelize');
const sequelize = require('./db');

const Moneda = sequelize.define('Moneda', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  simbolo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Moneda;
