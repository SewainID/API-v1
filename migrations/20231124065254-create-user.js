'use strict';
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/dbConfig");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
            allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
      },
      detail_users_id: {
        type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: DataTypes.DATE,
            allowNull: true,
      },
      refresh_token: {
        type: DataTypes.STRING(50),
            allowNull: true,
      },
    },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};