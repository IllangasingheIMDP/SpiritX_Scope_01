const express = require('express');
const { signup, login, getUser, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.post('/logout', logout);

module.exports = router;