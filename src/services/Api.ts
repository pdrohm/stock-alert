import {URL_API, URL_API_TOKEN} from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL: URL_API,
  params: {
    token: URL_API_TOKEN,
  },
});

export default api;
