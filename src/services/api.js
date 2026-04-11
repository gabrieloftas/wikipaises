import axios from "axios";

const api = axios.create({
    baseURL: "https://restcountries.com/v3.1",
    timeout: 10000
});

export default api;