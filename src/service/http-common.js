import axios from "axios";
import api_config from "./config";

const user = JSON.parse(localStorage.getItem("user"))

const added_data_axios = {
  'user_id': user.sub
};


const http = axios.create({
    baseURL: api_config.url,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${api_config.token}`,
        "Credentials": user.sub
    },
    transformRequest: [(data) => {
        return {...added_data_axios, ...data};
    }, ...axios.defaults.transformRequest],
});


export default http;
