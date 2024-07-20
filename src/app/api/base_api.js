import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!apiKey) {
  console.error('API key is not defined. Please set it in your .env.local file.');
}


const api = axios.create({
    baseURL:`https://v6.exchangerate-api.com/v6/${apiKey}`,
});

export default api;
