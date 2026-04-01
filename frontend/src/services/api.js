import axios from "axios";

const API = axios.create({
  baseURL: "https://medivision-image-diagnosis-and-reporting.onrender.com"
});

export default API;
