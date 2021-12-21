import axios from "axios";
import api_config from "./config";

const http = axios.create({
  baseURL: api_config.url,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${api_config.token}`
  }
});

export default http;
