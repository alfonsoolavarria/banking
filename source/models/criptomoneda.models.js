const {DataTypes} = require('sequelize');
const sequelize = require('./db');

const Criptomoneda = sequelize.define('Criptomoneda', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Criptomoneda;
