import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://localhost:8000` // Set your base URL
  // headers: {
  // 'Content-Type': 'application/json;charset=UTF-8',
  // 'Access-Control-Allow-Origin': '*',
  // Add other default headers if needed
  // }
});
