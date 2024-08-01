const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Ürün verileri
const products =  [
    {
      id: 1,
      name: 'iPhone 12',
      price: 799,
      rating: 4.5,
      thumbnail: 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/apple/thumb/108883-1-1_large.jpg',
      description: 'The latest iPhone with A14 Bionic chip.',
      arrivalDate: '12.10.2021',
      totalReviews: 100,
      reviews: [
      ],
      likes: 0
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      price: 999,
      rating: 4.7,
      thumbnail: 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/samsung/thumb/143186-1-1_large.jpg',
      description: 'The latest Samsung Galaxy with Exynos 2100.',
      arrivalDate: '15.01.2021',
      totalReviews: 150,
      reviews: [
        { user: 'Hakan', comment: 'Süper!', rating: 5 },
      ],
      likes: 0
    },
    {
      id: 3,
      name: 'Samsung Galaxy Z Flip6',
      price: 699,
      rating: 4.3,
      thumbnail: 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/samsung/thumb/146266-1-1_large.jpg',
      description: 'Samsung Galaxy Z Flip6 512 Gb Smartphone Mint Green',
      arrivalDate: '30.09.2021',
      totalReviews: 80,
      reviews: [
      ],
      likes: 0
    },
    {
      id: 4,
      name: 'Xiaomi Redmi Note 12 Pro',
      price: 500,
      rating: 4.8,
      thumbnail: 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/xiaomi/thumb/1-8_large.jpg',
      description: 'Xiaomi Redmi Note 13 Pro 12GB/512GB Black Smartphone.',
      arrivalDate: '21.04.2023',
      totalReviews: 80,
      reviews: [
      ],
      likes: 0
    },
  ];

// Verileri ekleme fonksiyonu
const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded');
};

seedDB().then(() => {
  mongoose.connection.close();
});
