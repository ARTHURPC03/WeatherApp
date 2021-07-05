import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export default api
