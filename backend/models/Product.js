const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: String,
  comment: String,
  rating: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  totalReviews: Number,
  thumbnail: String,
  reviews: [reviewSchema],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }] // Kullanıcı adlarını içeren dizi
});

module.exports = mongoose.model('Product', productSchema);
