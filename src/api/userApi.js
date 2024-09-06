import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => axios.get(API_URL);
export const fetchUser = (id) => axios.get(`${API_URL}?id=${id}`);
export const createUser = (userData) => axios.post(API_URL, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
