const express = require('express');
const { register, login, deleteUser, updateUser, getUsers } = require('../controllers/userController');
const { logout, authenticateToken, authenticateAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/users', authenticateAdmin, getUsers );  
router.delete('/users/:id', authenticateAdmin, deleteUser);
router.patch('/users/:id/admin', authenticateAdmin, updateUser);
  

module.exports = router;
