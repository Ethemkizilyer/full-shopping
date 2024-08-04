const express = require('express');
const { register, login } = require('../controllers/userController');
const { logout, authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);

module.exports = router;
