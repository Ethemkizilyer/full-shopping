import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/products/add-product',
        {
          name: productName,
          price: productPrice,
          description: productDescription,
          thumbnail:image
        },
        {
            headers: { Authorization: token }
        }
      );
  
      if (response.status === 201) {
        toast.success('Product added successfully!');
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setImage('');
      }
    } catch (error) {
      console.error('Error adding product:', error.response || error);
      toast.error('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yeni Ürün Ekleme</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="productName">
            Ürün Adı
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="productImage">
            Ürün Resmi
          </label>
          <input
            id="productImage"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="productPrice">
            Ürün Fiyatı
          </label>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="productDescription">
            Ürün Açıklaması
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Ekleniyor...' : 'Ürünü Ekle'}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
