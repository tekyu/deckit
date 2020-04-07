import axios from 'axios';

export default axios.create({
  baseURL: process.env.PROXY_ADDRESS,
  proxy: false,
  withCredentials: false
});
