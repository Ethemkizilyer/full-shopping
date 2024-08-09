const express = require('express');
const { getProducts, getProductById, addComment, toggleLike,addProduct } = require('../controllers/productController');
const { authenticateToken, authenticateAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProductById);
router.post('/:id/comment', authenticateToken, addComment);
router.post('/:id/like', authenticateToken, toggleLike);
router.post('/add-product', authenticateAdmin, addProduct);

module.exports = router;
