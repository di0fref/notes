import axios from "axios";
import api_config from "./config";


console.log("http")
const http = axios.create({
    baseURL: api_config.url,
    headers: {
        "Content-type": "application/json",
    },
});


http.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.token = localStorage.getItem("api_token")
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default http;



