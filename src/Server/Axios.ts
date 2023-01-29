import Axios from 'axios';
import { API_KEY, SERVER_URL } from '@/Server/Config';

const axios = Axios.create({
  baseURL: SERVER_URL,
  params: {
    'api-key': API_KEY,
  },
});

export default axios;
