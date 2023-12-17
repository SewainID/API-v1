const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const DetailsUsers = sequelize.define(
  'detail_users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    users_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    number_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    social_media_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    address_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    detail_shop_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    photo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },  
  {
    tableName: 'detail_users',
  }
);

module.exports = DetailsUsers;
