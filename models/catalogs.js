'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class catalogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  catalogs.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    day_rent: DataTypes.INTEGER,
    day_maintenance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'catalogs',
  });
  return catalogs;
};