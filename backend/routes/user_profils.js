'use strict'
const express = require('express');
const router = express.Router();
const userProfils = require('../controllers/user_profils')
const authMiddleware = require('../middleware/user_auth')
const profilMiddleware = require('../middleware/profil_auth')
const multer = require('../middleware/multer-config')

router.get('/:id', authMiddleware, profilMiddleware, userProfils.getProfil);
router.put('/update/:id', authMiddleware, profilMiddleware, multer, userProfils.updateProfil);

module.exports = router;