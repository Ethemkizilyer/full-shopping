const express = require('express');
const { getProducts, getProductById, addComment, toggleLike,addProduct, productDelete } = require('../controllers/productController');
const { authenticateToken, authenticateAdmin } = require('../middleware/authMiddleware');
const upload = require('../upload');
const router = express.Router();

router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProductById);
router.post('/:id/comment', authenticateToken, addComment);
router.post('/:id/like', authenticateToken, toggleLike);
router.delete('/:id', authenticateAdmin, productDelete);
router.post('/add-product', authenticateAdmin, upload.single('thumbnail'),addProduct);

module.exports = router;
