import axios from "axios"

const http = axios.create({
  baseURL: process.env.REACT_APP_BFF_API || "https://dp-automated-trading-web-api.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export default http
