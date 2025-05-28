const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const MonedaHistory = sequelize.define('MonedaHistory', {
  id_original: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  simbolo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  archivado_fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'moneda_history',
  timestamps: false,
});

module.exports = MonedaHistory;
