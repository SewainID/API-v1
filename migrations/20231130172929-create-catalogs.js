'use strict';
const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/dbConfig'); // Menggunakan objek sequelize dari konfigurasi koneksi database
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      size: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
      },
      status: {
        type: DataTypes.STRING
      },
      day_rent: {
        type: DataTypes.INTEGER
      },
      day_maintenance: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Catalogs');
  }
};
