const { sequelize } = require('./config/dbConfig');
const User = require('./models/UsersModel');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Model berhasil disinkronkan dengan database');
  } catch (error) {
    console.error('Gagal menyinkronkan model dengan database:', error);
  } finally {
    process.exit();
  }
})();
