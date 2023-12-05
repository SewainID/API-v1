// models/catalog.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig'); // Assuming you have a separate file for Sequelize configuration

const Catalog = sequelize.define(
  'Catalog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day_rent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day_maintenance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'catalogs', // Assuming you want to name your table 'catalogs'
  }
);

module.exports = Catalog;
