const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Modelleri dahil et
const User = require('./models/User');
const Product = require('./models/Product');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let invalidTokens = [];

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  if (invalidTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Logout route
app.post('/api/logout', authenticateToken, (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    invalidTokens.push(token);
  }
  res.json({ message: 'Logged out successfully' });
});

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(201).json({ token, username });
});

/// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and passwords match
    if (user && await user.matchPassword(password)) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, username });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get product list
app.get('/api/products', authenticateToken, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product details
app.get('/api/products/:id', authenticateToken, async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log("product",product)
  if (product) {
    return res.json(product);
  }
  return res.status(404).json({ message: 'Product not found' });
});

// Add a comment
app.post('/api/products/:id/comment', authenticateToken, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({ user: req.user.username, comment, rating });
    product.totalReviews += 1;
    product.rating = (product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.totalReviews).toFixed(1);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.log('Error adding comment:', err);
    res.status(500).json({ message: 'Error adding comment' });
  }
});


// Like a product
app.post('/api/products/:id/like', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const username = req.user.username;
    const userIndex = product.likedBy.indexOf(username);

    if (userIndex === -1) {
      // add the like
      product.likes = (product.likes || 0) + 1;
      product.likedBy.push(username);
    } else {
      // remove the like
      product.likes = (product.likes || 0) - 1;
      product.likedBy.splice(userIndex, 1);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.log('Error saving like:', err);
    res.status(500).json({ message: 'Error saving like' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});