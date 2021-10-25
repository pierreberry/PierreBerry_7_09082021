'use strict'
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/user_auth')

const userCredentials = require('../controllers/user_credentials')

router.get('/account/:id', authMiddleware, userCredentials.getAccount);
router.post('/signup', userCredentials.signup);
router.post('/login', userCredentials.login);
router.delete('/deleteaccount/:id', authMiddleware, userCredentials.deleteAccount)

module.exports = router;