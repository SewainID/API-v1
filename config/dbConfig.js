const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // Sesuaikan dengan database yang Anda gunakan
  host: 'localhost',
  username: 'postgres', // Sesuaikan dengan username Anda
  password: 'admin', // Sesuaikan dengan password Anda
  database: 'sewain', // Sesuaikan dengan nama database Anda
  define: {
    timestamps: false, // Mengatur timestamps ke false jika tidak ingin menggunakan kolom created_at dan updated_at
  },
});

module.exports = { sequelize };
