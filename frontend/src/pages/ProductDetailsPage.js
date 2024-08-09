import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar,FaRegHeart,FaHeart } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const username = localStorage.getItem("profile");

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
    
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: token }
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
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
console.log("product.reviews",product.reviews)
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <img src={product.thumbnail} alt="" className="size-72 object-cover rounded-lg mb-4"/>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <div className="flex items-center mb-4">
        <p className="text-gray-700 mr-2">Fiyatı: ${product.price}</p>
        <p className="text-yellow-500">

          Derece: {product.rating} stars ({product.totalReviews} yorum)
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-700 mr-2">Beğeni: {product.likes}</p>
        {product?.likedBy?.includes(username) ? <FaHeart
                size={20}
                color={"red"}
                className="cursor-pointer inline me-1 my-1 shadow-sm"
                onClick={handleLike}
              /> : <FaRegHeart
                size={20}
                color={"gray"}
                className="cursor-pointer inline me-1 my-1 shadow-sm"
                onClick={handleLike}
              /> }
        
      </div>
    </div>
    <div className="flex flex-col space-y-4">
      <h3>Add a Review</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} className="border border-gray-300 rounded-md p-2" required></textarea>
        {!product.reviews.find((i)=>i.user === username) ? <>
        <div className="flex items-center">
          <label htmlFor="rating" className="text-gray-700 mr-2">Derece:</label>
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
        </div></> : <>
        <div className="flex items-center">
          <label htmlFor="rating" className="text-gray-700 mr-2">Derece:</label>
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
        </div></>}
        <button type="submit" disabled={product.reviews.find((item)=>item.user === username)} className={`px-4 py-2 bg-green-500 text-white rounded-md  block ${product.reviews.find((item)=>item.user === username) ? "opacity-50" : "opacity-100 hover:bg-green-700"}`}>Gönder</button>
      </form>
      <h3>Yorumlar</h3>
      <ul className="list-disc space-y-2">
        {product.reviews.map((review, index) => (
          <li key={index} className='flex items-start justify-start gap-1 flex-col'>
            <strong className='flex gap-1 items-center justify-center'>{review.user} <span className='flex justify-center items-center'>({[...Array(5)].map((star, index) => {
          const ratingValue = review.rating - 1;

          return (
            <label key={index} className=''>
              <FaStar
                size={16}
                color={ratingValue >= index ? "#ffc107" : "#e4e5e9"}
                className="cursor-pointer inline me-1 my-1"
                
              />
            </label>
          );
        })})</span> : </strong> <div className="">{review.comment}</div> 
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default ProductDetailsPage;
