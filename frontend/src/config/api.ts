import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_RAFIQ_API_ADDRESS || "/";
let token = "";

const ISSERVER = typeof window === "undefined";

if(!ISSERVER) {
  // Access localStorage
  token = localStorage.getItem('token') || "";
}

const Axios = axios.create({
  baseURL,
  headers: {
    Authorization: `Token ${token}`,
    // Accept: 'application/json'
  }
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('>> ERR: ', error);
    return Promise.reject(error);
  }
);

export default Axios;
