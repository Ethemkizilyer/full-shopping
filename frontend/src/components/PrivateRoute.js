import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Kimlik doğrulama durumunu kontrol eden işlev
const useAuth = () => {
  // Bu basit örnekte, kullanıcı token'ı localStorage'da tutuluyor.
  const token = localStorage.getItem('token');
  return token !== null;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;