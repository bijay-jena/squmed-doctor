import axios from "axios";

const baseURL = "https://med-server-dev.squbix.com/";

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;
