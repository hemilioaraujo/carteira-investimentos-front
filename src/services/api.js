import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL da sua API Laravel
  headers: {
    Accept: 'application/json',
  },
})

export default api
