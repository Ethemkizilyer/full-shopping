import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
const App = () => {
  const isAuth = !!localStorage.getItem('token'); // Kullanıcının token'ı olup olmadığını kontrol ediyor

  return (
    <div className='w-full h-screen bg-orange-100'>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Route>
        {/* Anasayfaya yönlendirme */}
        <Route path="/" element={isAuth ? <Navigate to="/products" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
};

export default App;
