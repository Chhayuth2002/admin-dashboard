import axios from 'axios'
export const api = axios.create({
  baseURL: 'https://course-web-service.onrender.com/api/v1'
})
