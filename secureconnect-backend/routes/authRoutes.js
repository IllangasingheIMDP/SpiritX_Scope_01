const express = require('express');
const { signup, login, getUser, logout,checkUsername } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.post('/logout', logout);
router.get('/check-username/:username', checkUsername);



module.exports = router;