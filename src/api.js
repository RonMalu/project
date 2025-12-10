import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Rails backend URL
});

export default api;
