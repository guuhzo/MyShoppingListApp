import axios from 'axios'

const api = axios.create({
  baseURL: 'https://60a651a3b970910017eb1461.mockapi.io'
})

export default api;