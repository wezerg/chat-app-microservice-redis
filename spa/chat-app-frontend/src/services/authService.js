import { ref } from "vue";
import instAxios from "./InstAxios";
import cookies from 'vue-cookies';
import { useRouter } from "vue-router";

const user = ref(null);
    
const router = useRouter();

async function login(username, password){
    const payload = {username, password};
    return await instAxios().post("http://localhost:3000/auth/login", payload).catch(error => error.response);
}

async function register(username, password, confirmPassword){
    const payload = {username, password, confirmPassword}
    return await instAxios().post("http://localhost:3000/auth/register", payload).catch(error => error.response);
}

async function loginAuto(){
    return await instAxios().get("http://localhost:3000/auth/auto").catch(error => error.response);
}

function disconnect(){
    user.value = null;
    cookies.remove('auth-chat-app');
    router.push({ name: "home" });
}

function useAuthService(){
    return {user, login, register, loginAuto, disconnect};
}

export {useAuthService};