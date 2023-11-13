const express = require('express');
const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
  res.json({ message: 'Ping!' });
});

app.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
