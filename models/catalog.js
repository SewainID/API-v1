// models/catalog.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const DetailShop = require('./detailshop');

const Catalog = sequelize.define(
  'Catalog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shop_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: DetailShop,
        key: 'id',
      },
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
    photo_url: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'catalogs',
  }
);

module.exports = Catalog;
