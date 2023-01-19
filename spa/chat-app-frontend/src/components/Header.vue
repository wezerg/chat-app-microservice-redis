<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuthService } from '../services/authService';
import instAxios from '../services/InstAxios';
import { useRouter } from "vue-router";

const count = ref(0);
const {user, disconnect} = useAuthService();
const router = useRouter();
const baseUrlHits = import.meta.env.VITE_URL_HITS;

onMounted(async () => {
    const {status, data} = await instAxios().get(`${baseUrlHits}/hits`).catch(error => error.response);
    if (status === 200) {
        count.value = parseInt(data);
    }
});

function disconnectBtn(){
    disconnect();
    router.push({ path: "/", name: "home" });
}

</script>

<template>
    <header>
        <nav>
            <div>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/login" v-if="!user">Login / Register</RouterLink>
                <RouterLink to="/rooms" v-if="user">ChatApp</RouterLink>
            </div>
            <div style="display: flex; align-items: center;">
                <p>Compteur de visites : {{count}}</p>
                <button class="btn-error" v-if="user" @click="disconnectBtn()">Déconnexion</button>
            </div>
        </nav>
    </header>
</template>

<style scoped>
nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
nav a, p{
    padding: 4px 8px;
    text-decoration: none;
}
p{
    margin: 0;
}
nav a:hover{
    text-decoration: underline;
}
</style>