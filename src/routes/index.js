const express = require("express");

const router = express.Router();

const { getVersion } = require('../controllers/versionController');
const {ping} = require("../controllers/pingController");
const {auth} = require("../middleware/auth");

router.get('/version', getVersion);
router.get('/ping', ping);
router.get('/protected', auth ,ping);

// Route Register
// router.post("/register", register);

// Route Login
// router.post("/login", login);


module.exports = router;
