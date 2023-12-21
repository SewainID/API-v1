const router = require('./src/routes');
const express = require('express');
const app = express();
const setupAssociations = require('./models/associations');

app.use(express.json());
const port = process.env.PORT || 8080;



app.use('/api/v1/', router);
setupAssociations();



app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
