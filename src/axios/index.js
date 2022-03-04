import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4/',
  timeout: 1000,
  headers: {'Authorization': 'Bearer 26cba2c97fa6945b02d89ab23831efb6d92bce3a'}
});

const list = async () => {
  const res = await api.get(`groups/Bm33f6skfJJ/bitlinks/clicks`)
  return res
}
  

export default { api, list }