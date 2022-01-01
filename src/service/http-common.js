import axios from "axios";
import api_config from "./config";

const http = axios.create({
    baseURL: api_config.url,
    headers: {
        "Content-type": "application/json",
    },
});


http.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem("api_token")
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default http;



