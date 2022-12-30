import axios from 'axios';
import cookies from 'vue-cookies';

export default function instAxios(){
    const authCookie = cookies.get('auth-chat-app');
    const instance = axios.create({});
    instance.interceptors.request.use((config) => {
        if (cookies.isKey('auth-chat-app')) {
            config.credentials = "same-origin";
            config.headers.Cookie = authCookie;
        }
        return config;
    });
    instance.interceptors.response.use((response) => {
        return {status: response.status, data: response.data}
    }, (error) => {
        return {status: error.response.status, error: error.response.data};
    });
    return instance;
}