import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import AddProductPage from './components/AddProductPage';

const App = () => {
  const [token, setToken] = useState(!!localStorage.getItem('token'));
  const isAuth = !!localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isAdmin'));
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('isAdmin'));

  const handleLogin = (adminStatus) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
  };

  useEffect(() => {
    
    setToken(!!localStorage.getItem('token'));
  }, [!!localStorage.getItem('token')]);
console.log("isAdmin",isAdmin)
  return (
    <div className='w-full min-h-screen h-full bg-orange-100'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            {isAdmin && <Route path="/products/add-product" element={<AddProductPage />} />} {/* Conditionally render AddProductPage */}
          </Route>
          <Route path="*" element={isAuth ? <Navigate to="/products" /> : <Navigate to="/auth/login" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
