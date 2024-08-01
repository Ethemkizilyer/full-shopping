import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});
export const fetchProducts = () => API.get('/products', {
  headers: { Authorization: JSON.parse(localStorage.getItem('profile')).token }
});
export const fetchProductById = (id) => API.get(`/products/${id}`, {
  headers: { Authorization: JSON.parse(localStorage.getItem('profile')).token }
});
export const login = (formData) => API.post('/login', formData);
export const register = (formData) => API.post('/register', formData);
