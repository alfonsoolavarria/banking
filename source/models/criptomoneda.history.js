const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const CriptomonedaHistory = sequelize.define('CriptomonedaHistory', {
  id_original: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  archivado_fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'criptomoneda_history',
  timestamps: false,
});

module.exports = CriptomonedaHistory;
