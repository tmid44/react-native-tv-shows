import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // replace with your Laravel API URL
});

export default api;


// export const getUsers = async () => {
//   const response = await axios.get('http://127.0.0.1:8000/api/users');
//   return response.data;
// };

// export const getUser = async (userId) => {
//   const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
//   return response.data;
// };

// export const storeUser = async (userData) => {
//   const response = await axios.post(`http://127.0.0.1:8000/api/users/store`, userData);
//   return response.data;
// };

