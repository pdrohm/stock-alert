// src/services/Api.ts
import axios from 'axios';

export const API_TOKEN = 'cqb3de9r01qmfd85mesgcqb3de9r01qmfd85met0';
const BASE_URL = 'https://finnhub.io/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    token: API_TOKEN,
  },
});

export default api;
