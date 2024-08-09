const Product = require('../models/Product');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const getProducts = async (req, res) => {
  const products = await Product.find();
  // console.log("products",products)
  res.json(products);
};

const addProduct = async (req, res) => {
  try {
      const { name, price, description,thumbnail } = req.body;
      if (!name || !price || !description || !thumbnail) {
          return res.status(400).json({ message: 'Bu alanlar zorunludur' });
      }


   const newProduct = new Product({
    name,
    description,
    price,
    thumbnail // Save db image
  });

      await newProduct.save();

      res.status(201).json({ message: 'Ürün başarıyla eklendi', product: newProduct });
  } catch (error) {
      res.status(500).json({ message: 'Server hatası', error });
  }
};

const getProductById = async (req, res) => {
  
  const productt = await Product.findById(req.params.id);
  console.log("req.params.id",req.params.id)
  console.log("productt",productt)
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(productId);
    console.log("productId",productId)
    console.log("product",product)
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    res.json(product);
  } catch (error) {
    console.error("Hata mesajı:", error); // Hata mesajını konsola yazdır
    res.status(500).json({ message: 'Server hatası', error });
  }
};

const addComment = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });

    product.reviews.push({ user: req.user.username, comment, rating });
    product.totalReviews = product.reviews.length;
    product.rating = (product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.totalReviews).toFixed(1);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error('Yorum ekle hatası:', err);
    res.status(500).json({ message: 'Yorum ekle hatası' });
  }
};

const toggleLike = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });

    const username = req.user.username;
    const userIndex = product.likedBy.indexOf(username);

    if (userIndex === -1) {
      // Like ekleme
      product.likes = (product.likes || 0) + 1;
      product.likedBy.push(username);
    } else {
      // Like silme
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

const productDelete =async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
console.log("product",product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Optionally, delete the image file from the server
    // if (product.thumbnail) {
    //   const imagePath = path.resolve(__dirname, '..', product.thumbnail); // Resolve the absolute path

    //   try {
    //     await fs.unlink(imagePath); // Asynchronously delete the image file
    //     console.log('Image file deleted successfully');
    //   } catch (err) {
    //     console.error('Error deleting image file:', err);
    //     // Optionally, handle error (e.g., log it, notify admin, etc.)
    //   }
    // }

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


module.exports = { getProducts, getProductById, addComment, toggleLike,addProduct,productDelete };
