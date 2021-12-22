import axios from "axios";
import api_config from "./config";

// const user = JSON.parse(localStorage.getItem("user"))
//
// const added_data_axios = {
//     'user_id': user.sub?null:null
// };


const http = axios.create({
    baseURL: api_config.url,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${api_config.token}`,
        // "Credentials": user.sub?null:null
    },
    // transformRequest: [(data) => {
    //     return {...added_data_axios, ...data};
    // }, ...axios.defaults.transformRequest],
});

// Response interceptor for API calls
// http.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const access_token = await refreshAccessToken();
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//         return http(originalRequest);
//     }
//     return Promise.reject(error);
// });
//
//
// function refreshAccessToken() {
//
//     let options = {
//         method: 'POST',
//         headers: {'content-type': 'application/json'},
//         body: '{"client_id":"' + process.env.CLIENT_ID + '","client_secret":"' + process.env.CLIENT_SECRET + '","audience":"https://api.fahlstad.se","grant_type":"client_credentials"}'
//     };
//     fetch("https://dev-l2vt-791.eu.auth0.com/oauth/token", options)
//         .then((r) => r.json());
// }


export default http;



