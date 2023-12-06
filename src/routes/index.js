const express = require('express');
const router = express.Router();
const { getVersion } = require('../controllers/versionController');
const { ping } = require('../controllers/pingController');
const { auth } = require('../middleware/auth');
const userController = require('../controllers/UsersController');
const { login, register } = require('../controllers/authController');
const catalogController = require('../controllers/catalogController');
const { attachmentsControllers } = require('../controllers/attachmentsController');
const detailShopController = require('../controllers/detailshopController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/version', getVersion);
router.get('/ping', ping);
router.get('/protected', auth, ping);
router.use('/users', userController);
router.post('/register', register);
router.post('/login', login);

router.get('/catalogs', catalogController.getAllCatalogs);
router.get('/catalogs/:id', catalogController.getCatalogByid);
router.post('/catalogs', catalogController.createCatalogs);
router.put('/catalogs/:id', catalogController.updateCatalogs);
router.delete('/catalogs/:id', catalogController.deleteCatalogs);

router.get('/detail-shops', detailShopController.getAllShops);
router.get('/detail-shops/:id', detailShopController.getDetailShopById);
router.post('/detail-shops', detailShopController.createDetailShop);
router.put('/detail-shops/:id', detailShopController.updateDetailShop);
router.delete('/detail-shops/:id', detailShopController.deleteDetailShop);

router.post('/attachments', upload.single('file'), attachmentsControllers);

module.exports = router;
