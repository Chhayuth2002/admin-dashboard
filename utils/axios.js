import axios from 'axios'
export const api = axios.create({
  baseURL: 'https://course-web-service.onrender.com/api/v1'
  // baseURL: "http://localhost:5000/api/v1",
})
