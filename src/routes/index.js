const express = require('express');
const router = express.Router();

const { getVersion } = require('../controllers/versionController');
const { ping } = require('../controllers/pingController');
const { auth } = require('../middleware/auth');
const userController = require('../controllers/Users');
const { login, register } = require('../controllers/auth');

// Endpoint untuk mendapatkan versi
router.get('/version', getVersion);

// Endpoint untuk ping
router.get('/ping', ping);

// Endpoint yang dilindungi dengan autentikasi
router.get('/protected', auth, ping);

// Endpoint untuk manajemen pengguna
router.use('/users', userController);

// Endpoint untuk registrasi pengguna baru
router.post('/register', register);

// Endpoint untuk login
router.post('/login', login);

module.exports = router;
