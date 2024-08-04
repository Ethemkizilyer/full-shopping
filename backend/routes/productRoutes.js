const express = require('express');
const { getProducts, getProductById, addComment, toggleLike } = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProductById);
router.post('/:id/comment', authenticateToken, addComment);
router.post('/:id/like', authenticateToken, toggleLike);

module.exports = router;
