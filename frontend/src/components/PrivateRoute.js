import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn }) => {
  console.log("isLoggedIn",isLoggedIn)
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
