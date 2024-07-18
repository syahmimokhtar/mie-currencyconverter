import axios from 'axios'


// const apiKey=process.env.REACT_APP_API_KEY;
const apiKey="93a3484254c196a425c861ea";

// console.log(apiKey);

const api = axios.create({
    baseURL:`https://v6.exchangerate-api.com/v6/${apiKey}`,
});

export default api;
