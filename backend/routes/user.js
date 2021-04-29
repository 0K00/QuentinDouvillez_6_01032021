const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passewordValid = require('../middleware/passewordValid');

router.post('/signup', passewordValid, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;