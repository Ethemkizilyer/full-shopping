import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: token }
      });
      console.log("response f",response)
      setProducts(response.data);
    };

    fetchProducts();
  }, []);
console.log("products",products)
  return (
    <div className="container mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold text-center mb-8">Ürün Listesi</h2>
  <div onClick={()=>navigate("/products/add-product")}>Yeni Ürün Ekle</div>
  

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product,index) => (
          <div key={index} className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-100">
            <Link to={`/products/${product._id}`} className="block p-4">
              <img src={product.thumbnail} alt={product.name}  className="w-full h-48 object-cover object-center mb-2 rounded-lg"/>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-700 mb-1">Fiyatı: ${product.price}</p>
              <p className="text-gray-500 text-sm flex items-center">
              
                Derece: {product.rating} stars</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
