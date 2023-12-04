const express = require('express');
const router = express.Router();
const { getVersion } = require('../controllers/versionController');
const { ping } = require('../controllers/pingController');
const { auth } = require('../middleware/auth');
const userController = require('../controllers/Users');
const { login, register } = require('../controllers/auth');
const catalogController = require('../controllers/catalogController'); // Tambahkan ini
const {attachmentsControllers} = require('../controllers/attachmentsController');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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

// Endpoint untuk Catalog
router.get('/catalogs', catalogController.getAllCatalogs);
router.get('/catalogs/:id', catalogController.getCatalogByid);
router.post('/catalogs', catalogController.createCatalogs);
router.put('/catalogs/:id', catalogController.updateCatalogs);
router.delete('/catalogs/:id', catalogController.deleteCatalogs);

router.post('/attachments',upload.single('file'), attachmentsControllers);
module.exports = router;
