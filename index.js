const router = require('./src/routes');
const express = require('express');
const app = express();
const db = require('./config/dbConfig');
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET;
app.use('/api/v1/', router);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
