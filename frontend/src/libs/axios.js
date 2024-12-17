import axios from 'axios';
import { SV_API_URL } from '../config/config';

const authApi = axios.create({
    baseURL: `${SV_API_URL}api`,
    withCredentials: true,
});

authApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers = {
        Authorization: `Bearer ${token}`,
    };
    return config;
}
);

export default authApi;