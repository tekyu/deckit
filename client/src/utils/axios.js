import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3011/',
  proxy: false,
  withCredentials: true,
  crossDomain: true
});
