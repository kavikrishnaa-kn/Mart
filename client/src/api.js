import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/users/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE}/users/login`, credentials);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE}/products/${id}`);
  return response.data;
};

export const addProduct = async (productData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_BASE}/products`, productData, config);
  return response.data;
};

export const fetchCart = async (userId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_BASE}/cart/${userId}`, config);
  return response.data;
};

export const addToCart = async (userId, productId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_BASE}/cart/${userId}/add`, { productId }, config);
  return response.data;
};
