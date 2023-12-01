const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Catalog = sequelize.define("Catalog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
});

module.exports = Catalog;
