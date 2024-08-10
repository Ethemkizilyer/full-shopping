import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
export default function useAxiosInterceptor() {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token'); 
      console.log("Ethem")
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Geçerli zamanı al
  
        // Eğer token süresi dolmuşsa
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token'); // Token'ı sil
          localStorage.removeItem('userData'); // Diğer localStorage verilerini sil
          navigate('/login'); // Login sayfasına yönlendir
        }
      } 
    }, [navigate]);
}
