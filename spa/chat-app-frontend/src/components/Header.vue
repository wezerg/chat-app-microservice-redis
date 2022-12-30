<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuthService } from '../services/authService';
import instAxios from '../services/InstAxios';

const count = ref(0);
const {user} = useAuthService();

onMounted(async () => {
    const {status, data} = await instAxios().get("/hits").catch(error => error.response);
    if (status === 200) {
        count.value = parseInt(data);
    }
});
</script>

<template>
    <header>
        <nav>
            <div>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/login" v-if="!user">Login / Register</RouterLink>
                <RouterLink to="/chat" v-if="user">ChatApp</RouterLink>
            </div>
            <div>
                <p>Compteur de visites : {{count}}</p>
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
    color: white;
    text-decoration: none;
}
p{
    margin: 0;
}
nav a:hover{
    text-decoration: underline;
}
</style>