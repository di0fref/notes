import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-type": "application/json"
  }
});

export default http;