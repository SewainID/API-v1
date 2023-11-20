require('dotenv').config(); // Menggunakan dotenv untuk mengatur variabel lingkungan

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PGHOST, // Menggunakan variabel lingkungan
  port: process.env.PGPORT, // Menggunakan variabel lingkungan
  username: process.env.PGUSER, // Menggunakan variabel lingkungan
  password: process.env.PGPASSWORD, // Menggunakan variabel lingkungan
  database: process.env.PGDATABASE, // Menggunakan variabel lingkungan
  define: {
    timestamps: false,
  },
});

module.exports = { sequelize };
``