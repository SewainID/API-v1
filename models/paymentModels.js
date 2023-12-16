const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Payments = sequelize.define(
  'Payments',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'payments',
  }
);

module.exports = Payments;
