import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token }
      });
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:5000/api/products/${id}/comment`, { comment, rating }, {
      headers: { Authorization: token }
    });
    setProduct(response.data);
    setComment('');
    setRating(0);
  };

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:5000/api/products/${id}/like`, 
      {}, // Body boş olabilir, çünkü sadece yetkilendirme gerekiyor
      {
        headers: { Authorization: token }
      }
    );
    setProduct(response.data);
  };
  

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <img src={product.thumbnail} alt="" className="size-72 object-cover rounded-lg mb-4"/>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <div className="flex items-center mb-4">
        <p className="text-gray-700 mr-2">Price: ${product.price}</p>
        <p className="text-yellow-500">

          Rating: {product.rating} stars ({product.totalReviews} reviews)
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-700 mr-2">Likes: {product.likes}</p>
        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" onClick={handleLike}>Like</button>
      </div>
    </div>
    <div className="flex flex-col space-y-4">
      <h3>Add a Review</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} className="border border-gray-300 rounded-md p-2" required></textarea>
        <div className="flex items-center">
          <label htmlFor="rating" className="text-gray-700 mr-2">Rating:</label>
      <div className='flex my-3 gap-1'>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                id="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
              <FaStar
                size={24}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                className="cursor-pointer"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">Submit</button>
      </form>
      <h3>Reviews</h3>
      <ul className="list-disc space-y-2">
        {product.reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.user}:</strong> {review.comment} ({review.rating} stars)
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default ProductDetailsPage;
