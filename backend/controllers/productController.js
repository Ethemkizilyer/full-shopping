const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  return res.status(404).json({ message: 'Product not found' });
};

const addComment = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({ user: req.user.username, comment, rating });
    product.totalReviews = product.reviews.length;
    product.rating = (product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.totalReviews).toFixed(1);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

const toggleLike = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const username = req.user.username;
    const userIndex = product.likedBy.indexOf(username);

    if (userIndex === -1) {
      // Add the like
      product.likes = (product.likes || 0) + 1;
      product.likedBy.push(username);
    } else {
      // Remove the like
      product.likes = (product.likes || 0) - 1;
      product.likedBy.splice(userIndex, 1);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error saving like:', err);
    res.status(500).json({ message: 'Error saving like' });
  }
};

module.exports = { getProducts, getProductById, addComment, toggleLike };
