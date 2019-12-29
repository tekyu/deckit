import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:3011/api`,
  proxy: false,
  withCredentials: false,
  crossDomain: true
});
