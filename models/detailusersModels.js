const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const User = require('./UsersModels');

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
      references: {
        model: User,
        key: 'id',
      },
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
      // references: {
      //   model: 'social_media_users',
      //   key: 'id',
      // },
    },
    address_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      // references: {
      //   model: 'address_users',
      //   key: 'id',
      // },
    },
    detail_shop_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      // references: {
      //   model: 'detail_shops',
      //   key: 'id',
      // },
    },
  },
  {
    tableName: 'detail_users',
  }
);

module.exports = DetailsUsers;
