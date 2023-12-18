const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const SocialMediaUsers = sequelize.define(
  'SocialMediaUsers',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    tiktok_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instagram_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebook_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'social_media_users',
  }
);

module.exports = SocialMediaUsers;
