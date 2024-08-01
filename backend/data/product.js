
const products = [
  {
    id: 1,
    name: 'iPhone 12',
    price: 799,
    rating: 4.5,
    thumbnail: 'https://dummyimage.com/100x100/000/fff&text=1',
    description: 'The latest iPhone with A14 Bionic chip.',
    arrivalDate: '12.10.2021',
    totalReviews: 100,
    reviews: [
      { user: 'John Doe', comment: 'Great phone!', rating: 5 },
      { user: 'Jane Smith', comment: 'Too expensive.', rating: 3 },
    ],
    likes: 0
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21',
    price: 999,
    rating: 4.7,
    thumbnail: 'https://dummyimage.com/100x100/000/fff&text=2',
    description: 'The latest Samsung Galaxy with Exynos 2100.',
    arrivalDate: '15.01.2021',
    totalReviews: 150,
    reviews: [
      { user: 'Alice Brown', comment: 'Amazing screen!', rating: 5 },
      { user: 'Bob Johnson', comment: 'Battery life could be better.', rating: 4 },
    ],
    likes: 0
  },
  {
    id: 3,
    name: 'Google Pixel 5',
    price: 699,
    rating: 4.3,
    thumbnail: 'https://dummyimage.com/100x100/000/fff&text=3',
    description: 'The latest Google phone with pure Android experience.',
    arrivalDate: '30.09.2021',
    totalReviews: 80,
    reviews: [
      { user: 'Chris Evans', comment: 'Stock Android is the best!', rating: 5 },
      { user: 'Diana Prince', comment: 'Camera is not as good as expected.', rating: 3 },
    ],
    likes: 0
  },
];

module.exports = products;
