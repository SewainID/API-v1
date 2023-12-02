'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Catalog.init({
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    day_rent: DataTypes.INTEGER,
    day_maintenance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Catalog',
  });
  return Catalog;
};