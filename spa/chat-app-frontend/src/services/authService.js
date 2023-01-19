import { ref } from "vue";
import instAxios from "./InstAxios";
import cookies from 'vue-cookies';

const user = ref(null);
const baseUrlAuth = import.meta.env.VITE_URL_AUTH;

async function login(username, password){
    const payload = {username, password};
    return await instAxios().post(`${baseUrlAuth}/auth/login`, payload).catch(error => error.response);
}

async function register(username, password, confirmPassword){
    const payload = {username, password, confirmPassword}
    return await instAxios().post(`${baseUrlAuth}/auth/register`, payload).catch(error => error.response);
}

async function loginAuto(){
    return await instAxios().get(`${baseUrlAuth}/auth/auto`).catch(error => error.response);
}

function disconnect(){
    user.value = null;
    cookies.remove('auth-chat-app');
}

function useAuthService(){
    return {user, login, register, loginAuto, disconnect};
}

export {useAuthService};