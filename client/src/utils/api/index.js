import axios from "axios";

console.log(process.env.NODE_ENV);

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "http://localhost:3001/api/";

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});