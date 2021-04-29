const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const isowner = require('../middleware/isowner');

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, isowner, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, isowner, saucesCtrl.deleteSauce);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.get('/', auth, saucesCtrl.getAllSauce);

router.post('/:id/like', auth, saucesCtrl.likeDislike);

module.exports = router;
