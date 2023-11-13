const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');

router.get('/', ping);

module.exports = router;
